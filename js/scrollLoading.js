class scrollLoadingCLass{
    constructor(){
    this.userScroll();
    }

    userScroll (){
        window.addEventListener('scroll', function() {
            const heightPage = document.documentElement.scrollHeight - window.innerHeight;
        
            const scrollY = window.scrollY;
        
            const displacementPercentage = (scrollY / heightPage) * 100;
        
            if(displacementPercentage > 60){  //! <-- Value to changue if you want a different behavior
                if(document.querySelector('div.container'))
                    addVideosButton.renderFirstElements(9);
            }
        });
    }
}

const scrollLoading = new scrollLoadingCLass();