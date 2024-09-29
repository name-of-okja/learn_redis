import { DateTime } from 'luxon';
import type { CreateBidAttrs, Bid } from '$services/types';
import { client, withLock } from '$services/redis';
import { bidHistoryKey, itemsByPriceKey, itemsKey } from '$services/keys';
import { getItem } from './items';

export const createBid = async (attrs: CreateBidAttrs) => {
	return withLock(attrs.itemId, async (lockedClient: typeof client, signal: any) => {
		const item = await getItem(attrs.itemId);
		if (!item) {
			throw new Error('Item does not exist');
		}

		if (item.price >= attrs.amount) {
			throw new Error('Bid too low');
		}

		if (item.endingAt.diff(DateTime.now()).toMillis() < 0) {
			throw new Error('Item closed to biiding');
		}

		const serialized = serializeHistory(attrs.amount, attrs.createdAt.toMillis());

		if (signal.expired) {
			throw new Error('Lock Expired');
		}

		return Promise.all([
			lockedClient.rPush(bidHistoryKey(attrs.itemId), serialized),
			lockedClient.hSet(itemsKey(item.id), {
				bids: item.bids + 1,
				price: attrs.amount,
				highestBidUserId: attrs.userId
			}),
			lockedClient.zAdd(itemsByPriceKey(), { value: item.id, score: attrs.amount })
		]);
	});

	// WATCH MULTE 방식
	// return client.executeIsolated(async (isolatedClient) => {
	// 	await isolatedClient.watch(itemsKey(attrs.itemId));

	// 	const item = await getItem(attrs.itemId);
	// 	if (!item) {
	// 		throw new Error('Item does not exist');
	// 	}

	// 	if (item.price >= attrs.amount) {
	// 		throw new Error('Bid too low');
	// 	}

	// 	if (item.endingAt.diff(DateTime.now()).toMillis() < 0) {
	// 		throw new Error('Item closed to biiding');
	// 	}

	// 	const serialized = serializeHistory(attrs.amount, attrs.createdAt.toMillis());

	// 	return isolatedClient
	// 		.multi()
	// 		.rPush(bidHistoryKey(attrs.itemId), serialized)
	// 		.hSet(itemsKey(item.id), {
	// 			bids: item.bids + 1,
	// 			price: attrs.amount,
	// 			highestBidUserId: attrs.userId
	// 		})
	// 		.zAdd(itemsByPriceKey(), { value: item.id, score: attrs.amount })
	// 		.exec();
	// });
};

export const getBidHistory = async (itemId: string, offset = 0, count = 10): Promise<Bid[]> => {
	const startIdx = -1 * offset - count;
	const endIdx = -1 - offset;
	const range = await client.lRange(bidHistoryKey(itemId), startIdx, endIdx);

	return range.map((bid) => desrializeHistory(bid));
};

const serializeHistory = (amout: number, createdAt: number) => {
	return `${amout}:${createdAt}`;
};

const desrializeHistory = (stored: string) => {
	const [amount, createdAt] = stored.split(':');

	return {
		amount: parseFloat(amount),
		createdAt: DateTime.fromMillis(parseInt(createdAt))
	};
};
