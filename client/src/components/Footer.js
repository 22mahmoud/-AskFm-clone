import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';

const { Footer: FooterWrapper } = Layout;

const styles = {
  footer: {
    textAlign: 'center',
    background: '#fff',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};

const footerLinks = [
  {
    text: 'About TheQ',
    link: 'https://github.com/22mahmoud/AskFm-clone',
  },
  {
    text: '@22mahmoud The Author',
    link: 'https://github.com/22mahmoud',
  },
  {
    text: 'Contact Me',
    link: 'https://twitter.com/mahmoudzashraf',
  },
];

const Footer = () => (
  <FooterWrapper style={styles.footer}>
    {footerLinks.map(({ text, link }) => (
      <a key={text} href={link} style={{ textDecoration: 'none', color: '#000', marginLeft: 15 }}>
        {text}
      </a>
    ))}
  </FooterWrapper>
);

export default withRouter(Footer);
