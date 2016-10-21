import React from 'react';
import Layout from "../layout/Layout.jsx";
import ResultTable from "./ResultTable.jsx";
import cookie from 'react-cookie';

import { Router } from 'react-router';

export default class Dictionary extends React.Component {

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  constructor(props){
    super(props);
    //this.state = {dictionary: [{"text":"weather","translations":["Wetter", "Another","Test"]}]};
    this.state = {dictionary: []};
    this.getDictionary();
  }

  getDictionary(){
    fetch("/speeches", {
        method: "GET",
        headers: {
          "X-AUTH-TOKEN": cookie.load("AUTH_TOKEN")
        }
      })
      .then(r => {
        if(r.status == 401) this.context.router.push('/login');  
      })
      .then(r => r.json())
      .then(json => {
        console.log("json: ", json);
        this.setState({dictionary: json});
      })
      .catch(error => console.log("Request failed", error))
  }

  render(){
    return <Layout><ResultTable data={this.state.dictionary}/></Layout>;
  }
}
