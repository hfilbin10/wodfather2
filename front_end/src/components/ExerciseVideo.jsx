import { useEffect, useState } from 'react';
import { api } from '../utilities';

const ExerciseVideo = ({ exercise }) => {
    const [videoData, setVideoData] = useState(null);

    const getVideoData = async () => {
        try {
            const response = await api.get(`video/${exercise}`);
            setVideoData(response.data);
        } catch (error) {
            console.error('Error fetching video data:', error);
        }
    };

    useEffect(() => {
        getVideoData();
    }, [exercise]);

    return (
        <div>
            {videoData && videoData.items && videoData.items.length > 0 && videoData.items[0].id.videoId ? (
                <div>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoData.items[0].id.videoId}`}
                        title={videoData.items[0].snippet.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : null}
        </div>
    );
};

export default ExerciseVideo;

