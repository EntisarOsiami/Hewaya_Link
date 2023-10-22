import  { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CardContainer from '../Components/CardContainer.jsx';

function ExploreScreen() {
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !imagesLoaded) {
                    setImagesLoaded(true);
                }
            });
        });

        observer.observe(document.querySelector('.container-fluid'));

        return () => {
            observer.disconnect();
        };
    }, [imagesLoaded]);

    return (
        <div className="container-fluid explore-container" style={{ overflow: "hidden", width: "100%" }}>
            <Row className="explore-intro" style={{ textAlign: "center" }}>
                <Col>
                    <h2>Get to know us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                </Col>
            </Row>

            {/* Card section */}
            <Row className="py-3" style={{ backgroundColor: "rgb(255,248,239)" }}>
                <Col>
                    <CardContainer className="generic-card" />
                </Col>
                <Col>
                    <CardContainer className="generic-card" />
                </Col>
                <Col>
                    <CardContainer className="generic-card" />
                </Col>
            </Row>

            <Row style={{ backgroundColor: "rgb(255,248,239)" }}>
                <Col>
                    <CardContainer className="generic-card" />
                </Col>
                <Col>
                    <CardContainer className="generic-card" />
                </Col>
            </Row>

            {/* Subscribe section */}
            <Row style={{ textAlign: "center", backgroundColor: "rgb(190,228,231)", padding: "20px 0" }}>
                <div style={{
                    backgroundColor: "rgb(255,248,239)",
                    width: "80%",
                    margin: "auto",
                    padding: "4% 0"
                }}>
                    <h5>Join our mail list</h5>
                    <div style={{ width: "80%", margin: "auto" }}>
                        <input className="explore-subscribe-input" type="email" placeholder="Your Email" />
                        <button className="explore-subscribe-button" value="submit">Subscribe</button>
                    </div>
                </div>
            </Row>
        </div>
    );
}

export default ExploreScreen;
