import { useSelector } from 'react-redux';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { t } = useTranslation();

  return (
    <div>
      <div className="hero-section">
        <div className="text-center">
          <h1 className="mb-4">{t('hero:title')}</h1>
          <p className="mb-4">{t('hero:subtitle')}</p>
          {!isAuthenticated && (
            <div className="d-flex">
              <LinkContainer to="/login">
                <button className="btn-custom">{t('hero:signIn')}</button>
              </LinkContainer>
              <LinkContainer to="/register">
                <button className="btn-custom">{t('hero:signUp')}</button>
              </LinkContainer>
            </div>
          )}
        </div>
      </div>
      
      <Container className="card-container">
        <Row className="row-equal-height">
          <Col md={3}>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>{t('hero:reducedStress')}</Card.Title>
                <Card.Text>
                  {t('hero:stressText')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>{t('hero:improvedCreativity')}</Card.Title>
                <Card.Text>
                  {t('hero:creativityText')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>{t('hero:enhancedWellbeing')}</Card.Title>
                <Card.Text>
                  {t('hero:wellbeingText')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>{t('hero:socialConnections')}</Card.Title>
                <Card.Text>
                  {t('hero:connectionsText')}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
