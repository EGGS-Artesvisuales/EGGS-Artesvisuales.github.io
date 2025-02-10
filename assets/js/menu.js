 document.addEventListener("DOMContentLoaded", function () {
            const navToggle = document.getElementById("nav-toggle");
            const navMenu = document.getElementById("nav-menu");

            if (navToggle && navMenu) {
                const toggleMenu = () => {
                    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
                    navToggle.setAttribute("aria-expanded", String(!isExpanded));

                    navMenu.classList.toggle("active");
                    document.body.classList.toggle("no-scroll");
                };

                navToggle.addEventListener("click", toggleMenu);

                navMenu.querySelectorAll("a").forEach(link => {
                    link.addEventListener("click", () => {
                        navMenu.classList.remove("active");
                        navToggle.setAttribute("aria-expanded", "false");
                        document.body.classList.remove("no-scroll");
                    });
                });

                document.addEventListener("keydown", (event) => {
                    if (event.key === "Escape" && navMenu.classList.contains("active")) {
                        navMenu.classList.remove("active");
                        navToggle.setAttribute("aria-expanded", "false");
                        document.body.classList.remove("no-scroll");
                    }
                });
            } else {
                console.warn("⚠️ Elementos del menú no encontrados.");
            }
        });
