import React from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import myImg from './../assets/images/200x100.jpg'


//Attempt at Image grid. Unsuccessful after full day of attempted adjustments
// // create class
// class ImageGrid extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             images: [
//                 {name:'Image 1',src:myImg,desc:'This describes this image..'},
//                 {name:'Image 2',src:myImg,desc:'This describes this image 2..'},
//                 {name:'Image 3',src:myImg,desc:'This describes this image 3 ..'},
//                 {name:'Image 4',src:myImg,desc:'This describes this image 4..'},
//                 {name:'Image 5',src:myImg,desc:'This describes this image 5..'},
//                 {name:'Image 6',src:myImg,desc:'This describes this image 6..'},
//             ],
//             currentSelection: {},
//         };
//         this.handleClick = this.handleClick.bind(this);
//     }
//
//     componentDidMount() {
//         // set first image selected
//         this.setState({ currentSelection: this.state.images[0] });
//     }
//
//     handleClick(val) {
//         //console.log(val)
//         this.setState({ currentSelection: val });
//     }
//
//     render(){
//       //gets images in a collection
//         var { images, currentSelection } = this.state;
//         return(
//         <div>
//             <div className="row">
//                 <div className="col-md-4">
//                     <div className="row no-gutters">
//                     {images.map((val, k) => {
//                         return (
//                         <div className="col-md-4" key={k}>
//                             <img src={val.src} className={'img-fluid ' + (val.src===currentSelection.src?'p-1':'')} onClick={() => this.handleClick(val)} />
//                         </div>)
//                         })
//                     }
//                      </div>
//                 </div>
//                 <div className="col-md-4">
//                     <h3 className="font-weight-light">{ currentSelection.name }</h3>
//                     <p>{ currentSelection.desc }</p>
//                 </div>
//             </div>
//         </div>
//         )
//      }
//  };
// export default function Selection(){
//  const classes = useStyles()
//  return (
// <Grid container spacing = {10}>
// <Grid>
// <Card className = {classes.card}>
//     <div className="container-fluid py-4">
//         <h4 className="text-center font-weight-light text-light mb-3">React Gallery with Bootstrap</h4>
//         <ImageGrid />
//     </div>
//   </Card>
//  </Grid>
//  </Grid>
// )



const useStyles = makeStyles(theme => ({
 card: {
 maxWidth: 2000,
 margin: 'auto',
 marginTop: theme.spacing(5),
 marginBottom: theme.spacing(5),
 marginLeft: theme.spacing(5),
 marginRight: theme.spacing(5)
 },
 title: {
 padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
 color: theme.palette.openTitle
 },
 media: {
 minHeight: 400
 },
 credit: {
 padding: 10,
 textAlign: 'right',
 backgroundColor: '#00000',
 borderBottom: '1px solid #d0d0d0',
 '& a':{
 color: '#3f4771'
 }
 }
}))

export default function Selection(){
 const classes = useStyles()
 return (
<Grid container spacing = {10}>
<Grid>
<Card className = {classes.card}>
    <div className="container-fluid py-4">
        <h4 className="text-center font-weight-light text-light mb-3">React Gallery with Bootstrap</h4>
        <ImageGrid />
    </div>
  </Card>
 </Grid>
 </Grid>
)
}
