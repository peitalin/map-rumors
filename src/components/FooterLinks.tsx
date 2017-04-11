

import * as React from 'react'
import 'styles/FooterLinks.scss'

export default class FooterLinks extends React.Component<any, any> {

  render() {
    return (
      <div className='footer-rights'>
        <div className="social-container">
          <a className="social-footer social-facebook" href="https://www.facebook.com/"></a>
          <a className="social-footer social-twitter" href="https://twitter.com/"></a>
          <a className="social-footer social-instagram" href="https://www.instagram.com/"></a>
          <a className="social-footer social-email" href="mailto:n6378056@gmail.com"></a>
        </div>

        <div className='copyright'>Copyright © 2017 RealEstateRumors. All Rights Reserved.</div>
        <br/>
        <div className='footer-links'>
          <ul>
            <li><a href="https://amity.io/terms.php">Terms</a> <span>|&nbsp;</span> </li>
            <li><a href="https://amity.io/privacy.php">Privacy</a> <span>|&nbsp;</span> </li>
            <li><a href="mailto:n6378056@gmail.com">Email</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

