import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Alert, AlertTitle } from "@material-ui/lab";
import Fab from "@material-ui/core/Fab";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle"
import CircularProgress from '@material-ui/core/CircularProgress';

import "./Result.css";
import { Button } from "@material-ui/core";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      isSuccess:true,
      imgSrc: '',
      timeval: 0,
      isresult:false,
    };
  }
  
  timechange = () => {
    let timeval = 0;
    let timerId = setTimeout(function tick() {
      this.setState({timeval : this.state.timeval + 10,})
      timerId = setTimeout(tick.bind(this), 20);
    }.bind(this), 20);
  }
  //jsonresult : temp
  componentDidMount = () => {
    const url = "http://localhost:8000/web";
    const options = {
      method: "get",
      body: "test",
    };
    fetch(url, options)
    .then(res =>{
      console.log(res)
      this.setState({isresult:true})
      console.log(this.state.isresult)
    })  
  }
  
  render() {
    const { result, imgSrc } = this.state;

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },

      paper: {
        "& > *": {
          margin: theme.spacing(1),
          width: theme.spacing(20),
          height: theme.spacing(20),
        },
        color: theme.palette.text.secondary,
      },

      alert: {
        width: "100%",
        "& > * + *": {
          marginTop: theme.spacing(2),
        },
      },
    }));

    //fetch get json example
    const testChange = () => {
      this.setState({isSuccess:!this.state.isSuccess});
    }



    return (
      <Container
        id="result-page"
        maxWidth="sm"
        maxHeight="sm"
        className={useStyles.root}
      >
        <h1>Result</h1>
        {this.state.isresult?<div></div>:
        <Paper className={useStyles.paper} elevation={3}>
      <div>
        <button onClick={this.timechange}>progressbutton</button>
      </div>
      <CircularProgress variant="determinate" value={[this.state.timeval]}/>
        </Paper>
        }
        <br></br><br></br>
        {this.state.isSuccess?(
        <Alert className={useStyles.alert} severity="success">
          <AlertTitle>Success</AlertTitle>
          헬멧 인식에 성공했습니다! —{" "}
          <Link to="/">
            <strong>Home으로 돌아가기</strong>
          </Link>
        </Alert>):(<Alert className={useStyles.alert} severity="error">
          <AlertTitle>FAIL</AlertTitle>
          헬멧 인식에 실패했습니다! —{" "}
          <Link to="/">
            <strong>Home으로 돌아가기</strong>
          </Link>
        </Alert>)
      }
      <Button onClick = {testChange} color="secondary">suc/fail test</Button>
      </Container>
    );
  }
}

export default Result;
