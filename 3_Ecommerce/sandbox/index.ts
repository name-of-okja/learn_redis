import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
	// redis에서 hashSet에 null 이나 undiefined는 대입 할 수 없다.
	// value가 object 일 경우 object.ToString()이 되므로 원치않는 값이 대입된다.
	await client.hSet('car', {
		color: 'red',
		year: 1950
	});

	const car = await client.hGetAll('car');

	if (Object.keys(car).length === 0) {
		console.log('Car Not Exist');
		return;
	}
	console.log(car);
};
run();
