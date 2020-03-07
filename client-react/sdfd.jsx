'use strict';

const e = React.createElement;

class TableColums extends React.Component {
  render() {
    return (            
        <tr>
        <th className="removeIcon"> <i className="far fa-window-close"> </i></th>
        <th>category</th>
        <th>name</th>
        <th>year</th>
        <th>description</th>
      </tr>
    );
  }
}

class TableRow extends React.Component {
  delete(){
    this.props.delete(this.props.item.name, this.props.item.category);
  }
  render() {
    return (            
      <tr key={this.props.item.name}>
        <td className="removeIcon" onClick={this.delete.bind(this)}><i className="far fa-window-close"> </i></td>
        <td>{this.props.item.category}</td>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.year}</td>
        <td>{this.props.item.description}</td>
      </tr>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.delete = this.delete.bind(this);
  }
  delete(name, type){    
    $.ajax({
        url: '/delete/' + type + "/" + name,
        type: 'DELETE',
        success: function(result) {
           console.log("Entity Deleted from the DB !!")
        },
        error: function(result) {
          console.log("Entity Dailed to be deleted from the DB !!")
       }
    }).done(function() {
        const aRemovedRowItems = this.state.items.filter(el => el.name != name ) 
        this.setState({
          items: aRemovedRowItems
        });
    }.bind(this));
    
  }
  componentDidMount() {
    fetch("/items")
      .then(res => res.json())
      .then(
        (result) => {
          let aTableItems = handelTableItemsResult(result);
          this.setState({
            isLoaded: true,
            items: aTableItems
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { error, isLoaded, items } = this.state;
    return (
      <table id="myTable" border="1">
          <thead>
            <TableColums/>
          </thead>
          <tbody>
            {items.map(item => (
              <TableRow delete={this.delete} key={item.name} item={item}/>
            ))}
          </tbody>
      </table>
    );
  }
}

function handelTableItemsResult(oItems) {
  let aTableItems = [];
  const aTypeKeys = Object.keys(oItems);
  aTypeKeys.forEach(type => {
    const aItems = oItems[type];
    aItems.forEach(element => {
      aTableItems.push({
        category: type,
        name: element.name,
        year: element.year,
        description: element.description
      });
    });
  }); 
  return aTableItems;
}


const domContainer = document.querySelector('#wrapper');
ReactDOM.render(e(Table), domContainer);