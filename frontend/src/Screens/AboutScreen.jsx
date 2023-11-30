import { useTranslation } from 'react-i18next';

function About() {
  const { t ,i18n} = useTranslation();
  const isRtl = () => {
    const rtlLanguages = ['ar', 'he', 'ur']; 
    return rtlLanguages.includes(i18n.language);
  };


  return (
    <div className={`about-container ${isRtl() ? 'rtl' : ''}`}>      <section className="website-description">
        <h2>{t('about:header')}</h2>
        <p>{t('about:description')}</p>
        <h3>{t('about:visionTitle')}</h3>
        <p>{t('about:visionDescription')}</p>

        <h3>{t('about:coreFeaturesTitle')}</h3>
        <ul>
          <li>{t('about:coreFeatures:skillShowcasing')}</li>
          <li>{t('about:coreFeatures:feedbackLoop')}</li>
          <li>{t('about:coreFeatures:growthPrivileges')}</li>
          <li>{t('about:coreFeatures:bloggingTutorials')}</li>
        </ul>

        <p>{t('about:closingStatement')}</p>
      </section>

      <section className="community-guidelines">
        <h2>{t('about:communityGuidelinesTitle')}</h2>
        <ol>
          <li>{t('about:communityGuidelines:respectEachOther')}</li>
          <li>{t('about:communityGuidelines:noSpamming')}</li>
          <li>{t('about:communityGuidelines:keepItSafe')}</li>
          <li>{t('about:communityGuidelines:noTrollingOrFlameWars')}</li>
          <li>{t('about:communityGuidelines:contentRestrictions')}</li>
          <li>{t('about:communityGuidelines:reportMisbehavior')}</li>
          <li>{t('about:communityGuidelines:consequencesForViolations')}</li>
          <li>{t('about:communityGuidelines:constructiveFeedback')}</li>
          <li>{t('about:communityGuidelines:avoidFalseInformation')}</li>
          <li>{t('about:communityGuidelines:respectIntellectualProperty')}</li>
        </ol>
      </section>

      <section className="privacy-policy">
        <h2>{t('about:privacyPolicyTitle')}</h2>
        <ol>
          <li>{t('about:privacyPolicy:dataCollection')}</li>
          <li>{t('about:privacyPolicy:dataUsage')}</li>
          <li>{t('about:privacyPolicy:userControl')}</li>
          <li>{t('about:privacyPolicy:dataProtection')}</li>
          <li>{t('about:privacyPolicy:thirdPartyLinks')}</li>
          <li>{t('about:privacyPolicy:cookies')}</li>
          <li>{t('about:privacyPolicy:policyChanges')}</li>
        </ol>
      </section>

      <section className="additional-section">
        <h2>{t('about:additionalSectionTitle')}</h2>
        <p>{t('about:additionalSectionDescription')}</p>
      </section>
    </div>
  );
}

export default About;
