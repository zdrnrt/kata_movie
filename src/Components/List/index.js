import React from 'react';
import { Typography, Pagination, Flex, Row } from 'antd';
const { Paragraph } = Typography;
import Tile from '../Tile';
import Load from '../Load';

export default function List(props) {
	let request = props.props;
	// request.data = {
	// 	"page": 1,
	// 	"results": [
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": "/gGmf3CyHdXvaZtcun0DvU1WSNft.jpg",
	// 		"genre_ids": [
	// 		  28,
	// 		  14,
	// 		  12
	// 		],
	// 		"id": 626412,
	// 		"original_language": "ko",
	// 		"original_title": "외계+인 2부",
	// 		"overview": "Ean has a critical mission to return to the future to save everyone. However, she becomes trapped in the distant past while trying to prevent the escape of alien prisoners who are locked up in the bodies of humans. Meanwhile, Muruk, who helps Ean escape various predicaments, is unnerved when he begins sensing the presence of a strange being in his body. Traveling through the centuries, they are trying to prevent the explosion of the haava.",
	// 		"popularity": 651.155,
	// 		"poster_path": "/4RClncz0GTKPZzSAcAalHCw0h3g.jpg",
	// 		"release_date": "2024-01-10",
	// 		"title": "Alienoid: Return to the Future",
	// 		"video": false,
	// 		"vote_average": 7.015,
	// 		"vote_count": 366
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": "/dJ52jV7HlJ9hB8kdBOnj01DllBA.jpg",
	// 		"genre_ids": [
	// 		  18
	// 		],
	// 		"id": 82520,
	// 		"original_language": "en",
	// 		"original_title": "Return",
	// 		"overview": "Back from a tour of duty, Kelli struggles to find her place in her family and the rust-belt town she no longer recognizes.",
	// 		"popularity": 7.837,
	// 		"poster_path": "/xAuR564U2njKKcXSbfbq36rZLeA.jpg",
	// 		"release_date": "2011-02-10",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.505,
	// 		"vote_count": 3035
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": "/tu5IcNPo99rJkIgNwKZqPYQ2MiY.jpg",
	// 		"genre_ids": [
	// 		  27,
	// 		  14,
	// 		  10749
	// 		],
	// 		"id": 403587,
	// 		"original_language": "en",
	// 		"original_title": "Return",
	// 		"overview": "After reading an article about hypnotic regression, a woman whose maternal grandfather died when she was only three years old contacts the hypnotic subject named in the article believing that he is the reincarnation of her grandfather, and hoping that she can learn the truth about how he died.",
	// 		"popularity": 9.141,
	// 		"poster_path": "/54QOkHWUnn3gDZKfGojPiFqTHJD.jpg",
	// 		"release_date": "1985-10-31",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.083,
	// 		"vote_count": 1713
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [
	// 		  27
	// 		],
	// 		"id": 1211262,
	// 		"original_language": "en",
	// 		"original_title": "Return",
	// 		"overview": "A horror short with no dialogue (Advised to watch with headphones)",
	// 		"popularity": 5.207,
	// 		"poster_path": "/c9K1U1KQGh6jR6aaKkKssYsBqGE.jpg",
	// 		"release_date": "2018-12-10",
	// 		"title": "Return",
	// 		"video": true,
	// 		"vote_average": 6.162,
	// 		"vote_count": 297
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": "/q2NR7tkons5k1kRXly4rHVdoXUs.jpg",
	// 		"genre_ids": [
	// 		  99
	// 		],
	// 		"id": 1188150,
	// 		"original_language": "tt",
	// 		"original_title": "Return",
	// 		"overview": "\"Behind every strong man is a strong woman!\", Mumine shouts as her husband is arrested. She has 4 children, she's in her mid-30s, and she's the wife of a Crimean Tatar political prisoner. Muslim Crimean Tatars have been oppressed for a long time. They were deported under Stalin, allowed to return under Gorbachev, and since the occupation of Crimea in 2014 under Putin, they are being persecuted again. \"Return\" is a portrait of Mumine and Maye, two strong women struggling with the consequences of oppression. Their traditional understanding of their role as women does not stand in the way of their dedication. They possess strength, beauty and dignity. Only in their most intimate moments, they are overwhelmed by desperate helplessness.",
	// 		"popularity": 5.745,
	// 		"poster_path": "/eFUAxw9l8Kz8PJhBQzCkAGMkoHB.jpg",
	// 		"release_date": "2023-09-26",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.195,
	// 		"vote_count": 131
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [
	// 		  27
	// 		],
	// 		"id": 1198870,
	// 		"original_language": "en",
	// 		"original_title": "Return",
	// 		"overview": "A girl is at school. Suddenly it's as if she can't breathe. As she runs down the stairs we follow her into her mind. It takes us deep into dark woods.",
	// 		"popularity": 7.266,
	// 		"poster_path": "/bgnpQbZf0fSVAtF80T0bJkDzRMi.jpg",
	// 		"release_date": "",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.554,
	// 		"vote_count": 111
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [
	// 		  16
	// 		],
	// 		"id": 836466,
	// 		"original_language": "en",
	// 		"original_title": "Return",
	// 		"overview": "A single man has worked most of his life in a supermarket. One night, he unexpectedly meets with his father, and the two are faced with the question of the reasons for their separation.",
	// 		"popularity": 5.336,
	// 		"poster_path": null,
	// 		"release_date": "2020-06-10",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.344,
	// 		"vote_count": 1046
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [
	// 		  27
	// 		],
	// 		"id": 379862,
	// 		"original_language": "en",
	// 		"original_title": "Return",
	// 		"overview": "A young couple purchase their new home to start a life together, only to find out the elderly couple next door have other plans for them.",
	// 		"popularity": 6.114,
	// 		"poster_path": "/rEnvFHITDcvKA7Gi9pD5FeCiEXy.jpg",
	// 		"release_date": "2015-11-28",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.388,
	// 		"vote_count": 690
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [
	// 		  18,
	// 		  14
	// 		],
	// 		"id": 670355,
	// 		"original_language": "en",
	// 		"original_title": "Return",
	// 		"overview": "Owen, a young man is dissatisfied with his life. He heads into the forest to escape and learns a lot during his time there.",
	// 		"popularity": 7.014,
	// 		"poster_path": null,
	// 		"release_date": "2020-01-28",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.528,
	// 		"vote_count": 424
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [
	// 		  18
	// 		],
	// 		"id": 320367,
	// 		"original_language": "en",
	// 		"original_title": "Return",
	// 		"overview": "A tale of terror. Cathy Reed has been institutionalized most of her life because of Schizophrenia, as a child her parents thought she was possessed by demons and had her exercised by priests. Medical science saw different. Now decades later Cathy is freed, relocated to her own flat and given a chance to be independent. Once alone things are not what they all seem and when her nightmares turn real she questions her state of mind before she is left to face her demons.",
	// 		"popularity": 8.067,
	// 		"poster_path": "/a3fhJx8oVTC1Mh9QraF1z2K1Wr1.jpg",
	// 		"release_date": "2015-01-01",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.484,
	// 		"vote_count": 826
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [],
	// 		"id": 834860,
	// 		"original_language": "ja",
	// 		"original_title": "RETURN",
	// 		"overview": "8mm work directed by Norihiko Morinaga.",
	// 		"popularity": 5.64,
	// 		"poster_path": "/5YOSdqwvDLxQiqqQ3KeUNt1ir1L.jpg",
	// 		"release_date": "1985-01-01",
	// 		"title": "RETURN",
	// 		"video": false,
	// 		"vote_average": 6.826,
	// 		"vote_count": 413
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": "/h4SIEXZcj5tY9w8mEWendCZJ1kE.jpg",
	// 		"genre_ids": [
	// 		  35
	// 		],
	// 		"id": 464446,
	// 		"original_language": "en",
	// 		"original_title": "Return",
	// 		"overview": "A young man returns home for the weekend to discover the difficulty of juggling friends, parents, magic mushrooms and several thousand chickens.",
	// 		"popularity": 7.248,
	// 		"poster_path": "/v4F270SLg2HM89XzHV4i7o1UXyt.jpg",
	// 		"release_date": "2015-07-04",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.518,
	// 		"vote_count": 428
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [
	// 		  99
	// 		],
	// 		"id": 828508,
	// 		"original_language": "es",
	// 		"original_title": "Return",
	// 		"overview": "",
	// 		"popularity": 11.542,
	// 		"poster_path": "/xWjw5JBMuce6Wv33dDUfmzVVaAL.jpg",
	// 		"release_date": "2018-05-11",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.533,
	// 		"vote_count": 369
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [],
	// 		"id": 357953,
	// 		"original_language": "en",
	// 		"original_title": "Return",
	// 		"overview": "Return is a methodical construction of the approach of an individual towards an unseen goal, which assumes metaphorical significance. Viola moves toward the camera/viewer, pausing every few steps to ring a bell, at which point he is momentarily thrust back to his starting place, and then advanced again. Finally reaching his destination, he is taken through all of the previous stages in a single instant and returned to the source of his journey.",
	// 		"popularity": 8.982,
	// 		"poster_path": null,
	// 		"release_date": "1975-09-04",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 7.031,
	// 		"vote_count": 245
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [],
	// 		"id": 1086372,
	// 		"original_language": "hy",
	// 		"original_title": "Return",
	// 		"overview": "The main character of the film is an outstanding physicist who was invited to Armenia from Russia to head a lab. He comes across many troubles in his homeland, but nevertheless finds his true love there.",
	// 		"popularity": 7.911,
	// 		"poster_path": null,
	// 		"release_date": "1972-07-02",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.629,
	// 		"vote_count": 330
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [],
	// 		"id": 348877,
	// 		"original_language": "en",
	// 		"original_title": "Return",
	// 		"overview": "Static images of an old country house are combined with voices of the past to evocative effect. Haunting and nostalgic, 'Return' conveys the life that exists in old, abandoned places.",
	// 		"popularity": 6.247,
	// 		"poster_path": null,
	// 		"release_date": "1972-07-15",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.692,
	// 		"vote_count": 245
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": "/8qgqVW4vW2fzodscB28cnNhOzwU.jpg",
	// 		"genre_ids": [
	// 		  99
	// 		],
	// 		"id": 1091834,
	// 		"original_language": "en",
	// 		"original_title": "Return",
	// 		"overview": "RETURN tells the story of a retired Green Beret who embarks on a healing journey from Montana to Vietnam. There he retraces his steps, shares his wartime experiences with his son, treats his Post-Traumatic Stress Disorder, and seeks out the mountain tribespeople he once lived with and fought alongside as a Special Forces officer.",
	// 		"popularity": 9.134,
	// 		"poster_path": "/opYp1lkbVHVJil8N0c5HRSB5D96.jpg",
	// 		"release_date": "2023-02-19",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.827,
	// 		"vote_count": 237
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [],
	// 		"id": 733668,
	// 		"original_language": "hy",
	// 		"original_title": "Return",
	// 		"overview": "Eyüp decides to cross mount Ararat looking for his aunt in Yerevan after following a madman's words. His aunt has also been expecting someone to come from behind this mount for many years. Eyüp cannot be sure about the woman he finds behind the blue door, whether it is his aunt or not because they can't understand each other.",
	// 		"popularity": 6.681,
	// 		"poster_path": null,
	// 		"release_date": "",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.472,
	// 		"vote_count": 230
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [
	// 		  16,
	// 		  878
	// 		],
	// 		"id": 839321,
	// 		"original_language": "en",
	// 		"original_title": "Return",
	// 		"overview": "Polish animator Anna Błaszczyk’s humorous short—a collage of drawing, cut-out, and computer animation—was inspired by Stanisław Lem’s 1961 novel Return from the Stars, a time-paradox tale of an astronaut who returns to Earth after many years away.",
	// 		"popularity": 7.179,
	// 		"poster_path": null,
	// 		"release_date": "2008-01-01",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 6.997,
	// 		"vote_count": 199
	// 	  },
	// 	  {
	// 		"adult": false,
	// 		"backdrop_path": null,
	// 		"genre_ids": [],
	// 		"id": 1268052,
	// 		"original_language": "fr",
	// 		"original_title": "Return",
	// 		"overview": "",
	// 		"popularity": 1.122,
	// 		"poster_path": "/jvAt8Yzzc66GZJsYGVRJAylgo3A.jpg",
	// 		"release_date": "2024-03-21",
	// 		"title": "Return",
	// 		"video": false,
	// 		"vote_average": 5.533,
	// 		"vote_count": 15
	// 	  }
	// 	],
	// 	"total_pages": 111,
	// 	"total_results": 2217
	//   }
	let list = <Load />;
	let pagination = null; 
	console.log('List', request.data)
	if (request.load) {
		if (!!request.error){
			console.log('List error: ', data.error);
			return list = <Paragraph>{'Ошибка загрузки'}</Paragraph>;
		}
		if (request.data.results.length == 0){
			return list = <Paragraph>{'Ничего не найдено'}</Paragraph>
		}

		list = request.data.results.map( (movie) => <Tile key={movie.id} props={movie} />)
		request.data.results.length > 0 && <Pagination defaultCurrent={request.data.page} total={request.data.results.total_pages} />

		// if (props.props.loaded) {
		// 	return
		// }
	}
	return(
		<div>
			<Row
				gutter={[36, 36]}
				align='stretch'
			>
				{list}
			</Row>
			{pagination}
		</div>
	)
}
