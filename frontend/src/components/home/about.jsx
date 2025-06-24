import infoimg from '../../img/info.png';

const About = () =>{
    const app_title = 'ShareMeSomething!'
    const app_description = `ShareMeSomething!, tu diario de recuerdos compartido con tus amigos y familiares.\n\n
    Crea publicaciones con tus imagenes favoritas, y almacenalas en un share compartido con tus contactos de la app.\n\n
    Almacena tus recuerdos favoritos por categoría y disfruta de tus momentos más magicos.`;

    return(
        <div className='app-container'>
            <h2 className='pages-title'>Bienvenido a {app_title}</h2>
            <div className='info-container'>
                <p>
                    {app_description}
                </p>
                <img className='info-img' src={infoimg} alt='info'></img>
            </div>
        </div>
    );
};

export default About;