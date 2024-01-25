// App.tsx
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Sun from '@/components/Sun';
import Flow from '@/components/Flow';
import Time from '@/components/Time';
import Direction from '@/components/Direction';
import axios from 'axios';
import Home from '@/components/Home';
import Mountain from '@/components/Mountain';
import User from '@/components/User';



const gridItems = [
	{
		image: <Home />
	},
	{
		image: <Sun />,
	},
	{
		image: <Flow />,
	},
	{
		image: <Mountain />
	},
	{
		image: <User />
	},
	{
		image: <Time />
	},
]


const App: React.FC = () => {

	const [selected, setSelected] = useState(0);

	useEffect(() => {
		axios.get("https://io.adafruit.com/api/v2/jmurphy5613/feeds/app?x-aio-key=aio_LrJm70oyK1xNQWTfUN5fauxSbd8x").then(e => {
			setSelected(JSON.parse(e.data.last_value))
		})
	}, [])


	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.title}>{`Niki's Box App Selector`}</h1>
				<div className={styles.grid}>
					{gridItems.map((item, index) => (
						<div key={index} className={styles.card}
							style={{ borderColor: selected === (index+1) ? '#39FF14' : '#626262' }}
							onClick={() => {
								setSelected(index+1)
								axios.post("https://io.adafruit.com/api/v2/jmurphy5613/feeds/app/data?x-aio-key=aio_LrJm70oyK1xNQWTfUN5fauxSbd8x", {
									datum: {
										value: index+1
									}
								})
							}}
						>
							<div className={styles["icon-container"]}>
								{item.image}
							</div>
						</div>
					))}
				</div>
			</div>

		</div>
	);
};

export default App;
