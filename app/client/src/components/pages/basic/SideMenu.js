import React from 'react';
import { Link } from 'react-router-dom';

export default class SideMenu extends React.Component {
  renderTreeView() {
    const menuTree = [{
      title: 'Hello',
      iconClassName: 'fa-laptop',
      subTree: [{
        title: 'Greeting',
        link: '/hello',
      }],
    }, {
      title: 'Link',
      iconClassName: 'fa-external-link',
      subTree: [{
        title: 'Github',
        link: 'https://github.com/sungminoh',
        isExternal: true,
      }],
    }];

    return menuTree.map((mainRow, mainIndex) => (
      <li className="treeview" key={`sidemenu-li-treeview-${mainIndex}`}>
        <a href="javascript:;">
          <i className={`fa ${mainRow.iconClassName}`} />
          <span>{mainRow.title}</span>
          <i className="fa fa-angle-left pull-right" />
        </a>

        <ul className="treeview-menu">
          {mainRow.subTree.map((subRow, subIndex) => {
            if (!subRow.isExternal) {
              return (
                <li key={subIndex}>
                  <Link to={{ pathname: subRow.link }}>
                    <i className="fa fa-circle-o" />
                    {subRow.title}
                  </Link>
                </li>
              );
            }
            return (
              <li key={subIndex}>
                <a href={subRow.link} target="_blank">
                  <i className="fa fa-circle-o" />
                  {subRow.title}
                </a>
              </li>
            );
          })}
        </ul>
      </li>
    ));
  }

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <ul className="sidebar-menu">
            <li className="header">MAIN NAVIGATION</li>
            {this.renderTreeView()}
          </ul>
        </section>
      </aside>
    );
  }
}
