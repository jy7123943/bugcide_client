import React from 'react';
import '../css/manual.scss';

const Manual = (props) => {
  const { projectToken } = props;

  return (
    <div className="manual-box">
      <section>
        <h3 className="manual-title">Getting Started</h3>
        <p className="manual-desc">
          Let's get started using Bugcide to collect errors in your code!
        </p>
      </section>
      <section className="code-area">
        <h4 className="code-title">for Vanilla Javascript</h4>
        <p className="code-desc">
          You need to include bugcide.vanilla.js in our page.
        </p>
        <pre className="code-box">
          <code>
            &lt;script src=&#34;https:&#47;&#47;cdn.jsdelivr.net&#47;npm&#47;bugcide.vanilla.js&#64;1.0.0&#34;&gt;&lt;&#47;script&gt;
          </code>
        </pre>
        <pre className="code-box">
          <code>
            Bugcide.init(&#123; projectToken: &#39;{projectToken}&#39; &#125;);
          </code>
        </pre>
      </section>
      <section className="code-area">
        <h4 className="code-title">for React.js</h4>
        <p className="code-desc">
          You can easily install the latest version of Bugcide via npm.
        </p>
        <pre className="code-box">
          <code>
            npm install Bugcide
          </code>
        </pre>
        <pre className="code-box">
          <code>
            import &#123; Bugcide &#125; from 'bugcide';
          </code>
        </pre>
        <pre className="code-box">
          <code>
            import React from 'react'&#59;<br />
            import &#123; render &#125; from 'react-dom'&#59;<br />
            import App from './src/App'&#59;<br />
            import &#123; Bugcide &#125; from 'bugcide';<br />
            <br />
            Bugcide.init(&#123; projectToken: '{projectToken}' &#125;)&#59;<br />
            <br />
            render(&lt;App /&gt;, document.getElementById('root'))&#59;
          </code>
        </pre>
      </section>
    </div>
  );
};

export default Manual;

