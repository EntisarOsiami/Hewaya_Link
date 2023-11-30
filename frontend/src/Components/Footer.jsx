import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t , i18n} = useTranslation();
  const year = new Date().getFullYear();

  const isRtlLanguage = () => {
    const rtlLanguages = ['ar']; 
    return rtlLanguages.includes(i18n.language);
  };

  return (
    <footer className={`footer ${isRtlLanguage() ? "rtl" : ""}`}>
      {" "}
      <Container>
        <Row>
          <Col md={6}>
            <h5>{t("footer:contactUs")}</h5>
            <p>
              {t("footer:contactDescription")}{" "}
              <a href="mailto:contact@HewayaLink.com" rel="noopener noreferrer">
                contact@HewayaLink.com
              </a>
            </p>
          </Col>
          <Col md={6}>
            <h5>{t("footer:followUs")}</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.facebook.com/" rel="noopener noreferrer">
                  <FaFacebook /> {t("footer:facebook")}
                </a>
              </li>
              <li>
                <a href="https://twitter.com/" rel="noopener noreferrer">
                  <FaTwitter /> {t("footer:twitter")}
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" rel="noopener noreferrer">
                  <FaInstagram /> {t("footer:instagram")}
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul>
              <li>
                <Link to="/about">{t("footer:termsOfService")}</Link>
              </li>
              <li>
                <Link to="/about">{t("footer:privacyPolicy")}</Link>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="footer-bottom text-center">
          <p className="mb-0">{t("footer:copyright", { year })}</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
