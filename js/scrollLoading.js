class scrollLoadingCLass{
    constructor(){
    this.userScroll();
    }

    userScroll (){
        window.addEventListener('scroll', function() {
            // Obtén la altura total de la página
            const heightPage = document.documentElement.scrollHeight - window.innerHeight;
        
            // Obtén la cantidad de desplazamiento vertical
            const scrollY = window.scrollY;
        
            // Calcula el porcentaje de desplazamiento
            const displacementPercentage = (scrollY / heightPage) * 100;
        
            // Imprime el porcentaje de desplazamiento en la consola
            // console.log(`Porcentaje de desplazamiento: ${displacementPercentage.toFixed(2)}%`);
            if(displacementPercentage > 90){
                if(document.querySelector('div.container'))
                    addVideosButton.add();
            }
        });
    }
}

const scrollLoading = new scrollLoadingCLass();