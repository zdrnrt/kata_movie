import React from 'react';
import {Typography, Card, Flex, Rate, Col} from "antd";
import {format} from 'date-fns';
import "./Tile.scss";
const { Title, Paragraph, Text, Link } = Typography;

export default function Tile(props) {
	const movie = props.props;
	const genre = movie.genre_ids.length > 0 ? movie.genre_ids.map( (rate, i) => <span key={i}>{rate}</span> ) : null ;
	return (
		<Col span={6} xs={12}>
			<Card className='tile' padding={0}>
				<Flex justify="space-between">
					<img
						alt={"poster" + movie.title}
						src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
						className='tile__poster'
						/>
					<div className='tile__info'>
						<Flex justify='space-between' align='center' style={{ marginBottom: 5 }}>
							<Title level={2} style={{ margin: 0, fontSize: 20 }} >{movie.title}</Title>
							<Text className='tile__rate'>{movie.vote_average.toFixed(1)}</Text>
						</Flex>
						{!!movie.release_date && <Paragraph style={{marginBottom: 7, color: '#827E7E'}}>{format(new Date(movie.release_date), 'LLLL dd, yyyy')}</Paragraph>}
						{!!genre && <Paragraph style={{marginBottom: 7}}>{genre}</Paragraph>}
						<Paragraph style={{marginBottom: 10}}>{movie.overview}</Paragraph>
						<Rate allowHalf defaultValue={movie.vote_average} count={10} />
					</div>
				</Flex>
			</Card>
		</Col>
	);
}
