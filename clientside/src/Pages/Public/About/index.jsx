const About = () => {
    return (
        <main className="text-center max-h-full">
            <h2 className="text-xl font-semibold my-2">A propos de nous</h2>
            <section className="flex flex-col text-start mx-4  items-center">
                <h3 className="text-lg font-medium my-2 justify-start">Le concept</h3>
                <p className="my-2 text-pretty ">
                Bienvenue sur Hollyfood, votre destination ultime pour explorer les délices culinaires du cinéma! Notre équipe passionnée est déterminée à vous faire vivre une expérience gustative inoubliable en vous guidant à travers les recettes emblématiques présentes sur grand écran. De la célèbre ratatouille de Remy dans "Ratatouille" aux somptueux festins des banquets médiévaux de "Game of Thrones", nous vous invitons à plonger dans un univers où la nourriture devient un personnage à part entière. Chez Hollyfood, nous célébrons la magie de la cuisine cinématographique et nous sommes ravis de partager cette passion avec vous.
                </p>
                <div className="flex justify-self-center" >
                <img src="https://images.wakelet.com/resize?id=Q0UNq3ukopR3Qka7QvsWG&h=285&w=768&q=85" alt="logo" />
                </div>
            </section>
        </main>
    )
};

export default About;