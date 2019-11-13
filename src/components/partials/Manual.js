import React from 'react';
import LinkList from './LinkList';
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
      <LinkList />
      <section className="code-area">
        <h4 className="code-title">For Vanilla Javascript</h4>
        <p className="code-desc">
          You need to include bugcide.vanilla.js first.<br />
          You can download the latest version of bugcide.vanilla.js on GitHub.<br />
          bugcide.vanilla.js built files are also available through jsDelivr.
        </p>
        <pre className="code-box">
          <code>
            &lt;script src=&#34;https:&#47;&#47;cdn.jsdelivr.net&#47;npm&#47;bugcide&#64;1.0.2/dist/bugcide.vanilla.js&#34;&gt;&lt;&#47;script&gt;
          </code>
        </pre>
        <p className="code-desc">
          We have minified version as well.
        </p>
        <pre className="code-box">
          <code>
            &lt;script src=&#34;https:&#47;&#47;cdn.jsdelivr.net&#47;npm&#47;bugcide&#64;1.0.2/dist/bugcide.vanilla.min.js&#34;&gt;&lt;&#47;script&gt;
          </code>
        </pre>
        <p className="code-desc">
          The examples below show how to load bugcide.vanilla.js with script tag.
        </p>
        <pre className="code-box">
          <code>
            &lt;script src=&#34;https:&#47;&#47;cdn.jsdelivr.net&#47;npm&#47;bugcide&#64;1.0.2/dist/bugcide.vanilla.js&#34;&gt;&lt;&#47;script&gt;<br />
            &lt;script&gt;<br />
            &nbsp;&nbsp;new Bugcide().init(&#123; projectToken: &#39;{projectToken}&#39; &#125;);<br />
            &lt;&#47;script&gt;
          </code>
        </pre>
      </section>
      <section className="code-area">
        <h4 className="code-title">For React.js</h4>
        <p className="code-desc">
          You can easily install the latest version of Bugcide package via npm.
        </p>
        <pre className="code-box">
          <code>
            npm i bugcide
          </code>
        </pre>
        <p className="code-desc">
          <strong>- index.js</strong>
        </p>
        <pre className="code-box">
          <code>
            import React from 'react'&#59;<br />
            import &#123; render &#125; from 'react-dom'&#59;<br />
            import App from './src/App'&#59;<br />
            import Bugcide from 'bugcide';<br />
            <br />
            new Bugcide().init(&#123; projectToken: '{projectToken}' &#125;)&#59;<br />
            <br />
            render(&lt;App /&gt;, document.getElementById('root'))&#59;
          </code>
        </pre>
        <p className="code-desc">
          If you want to catch all compile error, you need to install bugcide-webpack-plugin as well.
        </p>
        <pre className="code-box">
          <code>
            npm i bugcide-webpack-plugin
          </code>
        </pre>
        <p className="code-desc">
          <strong>- webpack.config.js</strong>
        </p>
        <pre className="code-box">
          <code>
            const bugcidePlugin = require('bugcide-webpack-plugin');<br/><br/>

            module.exports = &#123;<br/>
            &nbsp;&nbsp;...<br/>
            &nbsp;&nbsp;plugins: &#91;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;...<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;new bugcidePlugin(&#123;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;projectToken: '{projectToken}'<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;)<br/>
            &nbsp;&nbsp;&#93;<br/>
            &#125;;<br/>
          </code>
        </pre>
      </section>
    </div>
  );
};

export default Manual;

