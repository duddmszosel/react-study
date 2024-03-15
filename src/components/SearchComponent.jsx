import { useState } from 'react';
import searchSongs from '../utils/spotifySearch';
import SpotifyPlayerComponent from './SpotifyPlayer';
// import getAccessToken from '../utils/spotifyAuth';

const SearchComponent = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [selectedTrack, setSelectedTrack] = useState("");
	const [accessToken, setAccessToken] = useState("");
	const [onModal, setOnModal] = useState(false);
	const [modalParam, setModalParam] = useState({});

	const handleSearch = async () => {
		try {
			const searchResults = await searchSongs(query);
			console.log(searchResults);
			setResults(searchResults);
		} catch (error) {
			console.error('Error handling search:', error);
		}
	};

	const handlePlayTrack = async (uri) => {
		const token = localStorage.getItem("token");
		setAccessToken(token);
		setSelectedTrack(uri);

	};

	const modalHandler = (param, value) => {
		setModalParam(param);
		setOnModal(value);
	}

	return (
		<div>
			<header className='search-box'>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button onClick={handleSearch}>검색</button>
			</header>
			<ul className='search-list'>
				{results.map((result) => (
					<li className='search-items' key={result.id}>
						<article>
							<div className='content'>
								<div>
									{result.album.images.length > 0 && (
										<img
											src={result.album.images[0].url}
											alt={result.album.name}
										/>
									)}
								</div>
								<div className='text'>
									<div><strong>{result.name}</strong></div>
									<div>
										{result.artists.map((artist) => <div key={artist.id}>{artist.name}</div>)}
									</div>
								</div>
							</div>
							<div className='handler'>
								<button onClick={() => handlePlayTrack(result.uri)}>재생</button>
								<button onClick={() => { modalHandler(result, true) }}>선택</button>
							</div>
						</article>
					</li>
				))}
			</ul>
			{selectedTrack.length > 0 && (
				<SpotifyPlayerComponent token={accessToken} uris={[selectedTrack]} />
			)}
			{onModal && <Modal data={modalParam} onCancel={modalHandler}/>}
		</div>
	);
};

function Modal({ data, onCancel }) {

	const onSubmitHandler = () => {
		// todo 페이지 이동해서 data 넘겨야함
		console.log("track :", data);

	}

	return (
	<section className='modal'>
		<div>
			<h2>Confirm</h2>
			<div>선택한 곡을 저장하시겠습니까?</div>
			<div>
				<button onClick={onSubmitHandler}>저장</button>
				<button onClick={() => { onCancel({}, false) }}>취소</button>
			</div>
		</div>
	</section>
	)
}

export default SearchComponent;
