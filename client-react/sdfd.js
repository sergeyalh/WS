'use strict';

const e = React.createElement;

class Table extends React.Component {
    render() {
      return (
        <table id="myTable" border="1">
            <thead>
                <tr>
                    <th>Hello</th>
                    <th>World</th>
                </tr>
            </thead>
        </table>
      );
    }
  }

const domContainer = document.querySelector('#wrapper');
ReactDOM.render(e(Table), domContainer);