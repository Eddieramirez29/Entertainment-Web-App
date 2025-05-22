const apiKey = 'c47bcb11cf645c5ce2d69bb1a1e61671';
const container = document.getElementById('content');

function getRandomPage()
{
    return Math.floor(Math.random() * 500) + 1;
}

function getRandomMovies(count)
{
    const page = getRandomPage();
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`)
        .then(res => res.json())
        .then(data =>
        {
            const shuffled = data.results.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, count);
            selected.forEach(getTrailerAndEmbed);
        });
}

function getTrailerAndEmbed(movie)
{
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`)
        .then(res => res.json())
        .then(data =>
        {
            const trailer = data.results.find(v => v.site === 'YouTube' && v.type === 'Trailer');
            if (!trailer) return;

            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
            iframe.width = "300";
            iframe.height = "170";
            iframe.allowFullscreen = true;
            iframe.style.margin = "10px";

            container.appendChild(iframe);
        });
}

getRandomMovies(3);
