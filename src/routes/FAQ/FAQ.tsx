import { Col, Container, Row } from 'react-bootstrap';

import './FAQ.scss';

const FAQ = () => (
  <Container className='faq-container'>
    <Row>
      <h1 className='text-center'>Frequently Asked Questions</h1>
    </Row>
    <Row>
      <Col md={6}>
        <h3 className='text-yellow'>Why is my log data incorrect/not updating?</h3>
        <ul>
          <li>Make sure you have the "Upload collection log data" config enabled in the Runelite plugin.</li>
          <li>Click through your collection log in game to ensure the plugin has updated collection log data</li>
          <li>If all else fails, delete your character's collection log save file in the collection log folder under the Runelite folder and click through your collection log again. (Make sure you are logged out of the game when deleting the file)</li>
        </ul>
      </Col>
      <Col md={6}>
        <h3 className='text-yellow'>Have a question or problem?</h3>
        <ul>
          <li>Join the <a href='https://discord.gg/cFVa9BRSEN'>Log hunters Discord server</a></li>
          <li>Submit an issue on <a href='https://github.com/evansloan/collectionlog.net/issues'>GitHub</a></li>
        </ul>
      </Col>
    </Row>
  </Container>
);

export default FAQ;
