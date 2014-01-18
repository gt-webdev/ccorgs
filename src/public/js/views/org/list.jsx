 /** @jsx React.DOM */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['react', 
  '../Layout.js', 
  '../Header.js', 
  '../PageWrapper.js',
  '../Sidebar.js',
  '../Footer.js'], 
function(React, Layout, Header, PageWrapper, Sidebar, Footer) {
  var index = React.createClass({
    render: function() {
      var orgsElems = [], i, org;
      for (i=0; i < this.props.orgs.length; i+=1) {
        org = this.props.orgs[i];
        orgsElems.push(<div key={org._id}>
          <h1>{org.name}</h1>
          <p>{org.short}</p>
        </div>);
      }
      return <Layout>
        <Header />
        <PageWrapper title="COC Student Organizations" color="#ffcc00">
          {orgsElems}
        </PageWrapper>
        <Sidebar user={this.props.user}/>
        <Footer />
      </Layout>;
    },
    clickme: function(e) {
      console.log('clicked!');
      e.preventDefault();
    }
  });

  return index;
});
