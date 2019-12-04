(() => {
    
    const seeMoreButtons = document.querySelectorAll('.see-more'),
                 popOver = document.querySelector('.popover');

    function buildPopover(tbl_projects, el) {
        popOver.querySelector(".type").textContent = tbl_projects.Type;
        popOver.querySelector(".name").textContent = tbl_projects.Name;
        popOver.querySelector(".col").textContent = tbl_projects.Collaborators;
        popOver.querySelector(".desc").textContent = tbl_projects.Description;
        popOver.querySelector(".graphic").src = `images/${tbl_projects.Image}`;
        popOver.querySelector(".video").src = `video/${tbl_projects.Video}`;


        popOver.classList.add('show-popover');
        el.appendChild(popOver);
       }

       (() => {
    console.log('fired');

    const form = document.querySelector('form'), submit = form.querySelector('.submit-button');

    function handleMail(event) {
        event.preventDefault();

        let formdata = new FormData(form),
            maildata = {};

        for (let [key, value] of formdata.entries()) {
            maildata[key] = value;
        }

        let url = `/mail`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },

            body: JSON.stringify(maildata)
        })
            .then(res => res.json())
            .then(data => {
      
                console.log(data);

                if (data.response.includes("OK")) {
                
                    form.reset();
                    alert("email was sent!");
                }
            }) 
            .catch((err) => console.log(err));

        console.log('tried sending mail');
    }

    form.addEventListener('submit', handleMail)
})()

    function fetchData() {
        let targetEl = this,
            url = `/svgdata/${this.dataset.target}`;

            fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                buildPopover(data, targetEl);
            })
            .catch((err) => console.log(err));
    }

    const svgGraphic = document.querySelector(".svg-wrapper");

    // svgGraphic.addEventListener("click", () => {
    //     console.log(this.querySelector('.svg-wrapper'));
    // })

    seeMoreButtons.forEach(button => button.addEventListener("click", fetchData));
        })();