import React, { Component } from 'react';
import axios from '../utils/axios';

export default class CreateMissionComplete extends Component {
  state = {
    code: ''
  };

  async componentDidMount() {
    const code = await axios.get('/code');
    console.log(code);
  }

  render() {
    <div>
      <h2>任務代碼：{this.state.code}</h2>
      <h1>創建成功</h1>
      <p>接下來就努力與朋友一同達成目標吧！</p>
    </div>;
  }
}
