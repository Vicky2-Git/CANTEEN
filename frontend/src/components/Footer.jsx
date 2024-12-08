export default function Footer() {
    return (
        <div
            style={{
                padding: "12px 0px",
                background: "rgba(0, 0, 0, 0.5)", // Dark transparent background
                backdropFilter: "blur(10px)", // Blur effect
                color: "#f8f9fa", // Light font color
                textAlign: 'center',
                position: "relative",
                width: '100%',
                height: '85px',
                bottom: '0',
                left: '0',
                zIndex: '999',
            }}
        >
            <div className="text-center">
                <h5>
                    Made by{" "}
                    <a
                        href=""
                        style={{ textDecoration: "none", color: "#00d5ff" }}
                    >
                        AVM CAFETERIA's
                    </a>
                </h5>
            </div>

            <div className="text-center pt-1">
                <a
                    href="https://www.linkedin.com/in/vinayaga-textiles-525834295/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <i
                        className="bi bi-linkedin mx-2"
                        style={{ fontSize: "20px", color: "#00d5ff" }}
                    ></i>
                </a>

                <a href="" target="_blank" rel="noreferrer">
                    <i
                        className="bi bi-globe mx-2"
                        style={{ fontSize: "20px", color: "#00d5ff" }}
                    ></i>
                </a>

                <a
                    href="https://github.com/kakarot"
                    target="_blank"
                    rel="noreferrer"
                >
                    <i
                        className="bi bi-github mx-2"
                        style={{ fontSize: "21px", color: "#00d5ff" }}
                    ></i>
                </a>

                <a href="mailto:team1:24mx101@psgtech.ac.in" target="_blank" rel="noreferrer">
                    <i
                        className="bi bi-envelope-fill mx-2"
                        style={{ fontSize: "21px", color: "#00d5ff" }}
                    ></i>
                </a>
            </div>
        </div>
    );
}
