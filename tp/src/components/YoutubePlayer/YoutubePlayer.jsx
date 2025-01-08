const YoutubePlayer = ({id}) => {

    return (<div className="video-responsive">
        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>);
}

export default YoutubePlayer;