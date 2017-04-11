

import * as React from 'react'
import 'styles/FooterLinks.scss'

export default const FooterLinks = () => {
  return (
    <div className='footer-rights'>
      <div className="social-container">
        <a className="social-footer social-facebook" href="https://www.facebook.com/amityapp"></a>
        <a className="social-footer social-twitter" href="https://twitter.com/amityapp"></a>
        <a className="social-footer social-instagram" href="https://www.instagram.com/amityapp"></a>
        <a className="social-footer social-email" href="mailto:hello@amity.io"></a>
      </div>

      <div className='copyright'>Copyright © 2017 RealEstateRumors. All Rights Reserved.</div>
      <br/>
      <div className='footer-links'>
        <ul>
          <li><a href="https://amity.io/terms.php">Terms</a> <span>|&nbsp;</span> </li>
          <li><a href="https://amity.io/privacy.php">Privacy</a> <span>|&nbsp;</span> </li>
          <li><a href="http://bit.ly/amity-media-kit-website">Press Kit</a> <span>|&nbsp;</span> </li>
          <li><a href="mailto:hello@amity.io">Email</a></li>
        </ul>
      </div>
    </div>
  )
}

