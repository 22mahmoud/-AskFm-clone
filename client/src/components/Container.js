import React from 'react';
import { Row, Col } from 'antd';

const Container = ({ children, style }) => (
  <Row type="flex" justify="center" style={{ ...style, margin: 15, color: '#fff' }}>
    <Col xs={24} sm={24} md={16} lg={14} xl={12}>
      {children}
    </Col>
  </Row>
);

export default Container;
