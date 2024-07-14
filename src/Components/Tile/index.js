import React, { Component } from 'react';
import { Typography, Card, Flex, Rate, Col } from 'antd';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import './Tile.scss';
const { Title, Paragraph, Text } = Typography;

export default class Tile extends Component {
	state = { rateList: [] };

	render() {
		const movie = this.props.props;
		let genre = null;
		if (movie.genre_ids.length > 0 && !!this.props.genre) {
			genre = movie.genre_ids.map((el) => {
				let result = this.props.genre.find((item) => item.id == el);
				return (
					<span className="tile__genre" key={result.id} id={result.id}>
						{result.name}
					</span>
				);
			});
		}
		let rateColor = '#E90000';
		if (movie.vote_average >= 3 && movie.vote_average < 5) {
			rateColor = '#E97E00';
		} else if (movie.vote_average >= 5 && movie.vote_average < 7) {
			rateColor = '#E9D100';
		} else {
			rateColor = '#66E900';
		}

		return (
			<Col span={6} xs={12} data-id={movie.id}>
				<Card className="tile" padding={0}>
					<Flex justify="space-between">
						<img
							alt={'poster' + movie.title}
							src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
							className="tile__poster"
						/>
						<div className="tile__info">
							<Flex className="tile__head" justify="space-between" align="center">
								<Title level={2} style={{ margin: 0, fontSize: 20 }}>
									{movie.title}
								</Title>
								<Text className="tile__rate" style={{ borderColor: rateColor }}>
									{movie.vote_average.toFixed(1)}
								</Text>
							</Flex>
							{!!movie.release_date && (
								<Paragraph className="tile__date">
									{/* {format(new Date(movie.release_date), 'LLLL dd, yyyy', { locale: ru })} */}
									{format(new Date(movie.release_date), 'LLLL dd, yyyy')}
								</Paragraph>
							)}
							{!!genre && (
								<Paragraph style={{ marginBottom: 7 }}>
									<Flex justify="flex-start" align="center" gap={8} wrap={true}>
										{genre}
									</Flex>
								</Paragraph>
							)}
							<Paragraph className="tile__overview">
								{movie.overview.length < 90 ? movie.overview : movie.overview.slice(0, 90) + '...'}
							</Paragraph>
							<Rate
								allowHalf
								value={movie.rating}
								onChange={(e) => {
									this.props.listener({ id: movie.id, value: e });
								}}
								count={10}
							/>
						</div>
					</Flex>
				</Card>
			</Col>
		);
	}
}
