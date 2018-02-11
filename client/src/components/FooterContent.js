import React from 'react';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';

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

const FooterContent = () => (
  <Row type="flex" justify="center" gutter={16}>
    {footerLinks.map(({ text, link }) => (
      <Col key={text}>
        <a href={link} style={{ textDecoration: 'none', color: '#000' }}>
          {text}
        </a>
      </Col>
    ))}
  </Row>
);

export default withRouter(FooterContent);
