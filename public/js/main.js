(() => {
    
    const seeMoreButtons = document.querySelectorAll('.see-more'),
                 popOver = document.querySelector('.popover');

    function buildPopover(tbl_projects, el) {
        popOver.querySelector(".type").textContent = tbl_projects.Type;
        popOver.querySelector(".name").textContent = tbl_projects.Name;
        popOver.querySelector(".desc").textContent = tbl_projects.Description;
        popOver.querySelector(".graphic").src = `images/${tbl_projects.Image}`;
        popOver.querySelector(".video").src = `video/${tbl_projects.Video}`;


        popOver.classList.add('show-popover');
        el.appendChild(popOver);
       }

    // run the fetch API and get the DB data
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