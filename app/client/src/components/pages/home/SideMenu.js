import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarText } from '../../../text';

export default class SideMenu extends React.Component {
  renderTreeView() {
    const menuTree = [{
      title: 'Petro',
      iconClassName: 'fa-fire',
      link: '/petro',
    }, {
      title: 'Hello',
      iconClassName: 'fa-laptop',
      subTree: [{
        title: 'Greeting',
        link: '/hello',
      }, {
        title: 'Protected',
        link: '/auth',
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
        {mainRow.link ?
          <Link to={{ pathname: mainRow.link }}>
            <i className={`fa ${mainRow.iconClassName}`} />
            <span>{mainRow.title}</span>
          </Link> :
          <a href="javascript:;">
            <i className={`fa ${mainRow.iconClassName}`} />
            <span>{mainRow.title}</span>
            <i className="fa fa-angle-left pull-right" />
          </a>
        }

        {mainRow.subTree ?
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
          </ul> :
          null
        }
      </li>
    ));
  }

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <ul className="sidebar-menu">
            <li className="header">{SidebarText.HEADER}</li>
            {this.renderTreeView()}
          </ul>
        </section>
      </aside>
    );
  }
}
