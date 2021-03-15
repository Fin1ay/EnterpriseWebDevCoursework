import React from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import {Link} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import myImg from './../assets/images/borderlands.jpg'

// create class
class ImageGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [
                {name:'Image 1',src:myImg,desc:'This describes this image..'},
                {name:'Image 2',src:myImg,desc:'This describes this image 2..'},
                {name:'Image 3',src:myImg,desc:'This describes this image 3 ..'},
                {name:'Image 4',src:'//placeimg.com/600/400?text=4',desc:'This describes this image 4..'},
                {name:'Image 5',src:'//placeimg.com/600/400?text=5',desc:'This describes this image 5..'},
                {name:'Image 6',src:'//placeimg.com/600/400?text=6',desc:'This describes this image 6..'},
            ],
            currentSelection: {},
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // set first image selected
        this.setState({ currentSelection: this.state.images[0] });
    }

    handleClick(val) {
        //console.log(val)
        this.setState({ currentSelection: val });
    }

    hydrate(){
        var { images, currentSelection } = this.state;
        return(
        <div>
            <div className="row">
                <div className="col-md">
                    <div className="row no-gutters">
                    {images.map((val, k) => {
                        return (
                        <div className="col-sm-4" key={k}>
                            <img src={val.src} className={'img-fluid ' + (val.src===currentSelection.src?'p-1':'')} onClick={() => this.handleClick(val)} />
                        </div>)
                        })
                    }
                     </div>
                </div>
                <div className="col-md">
                    <h3 className="font-weight-light">{ currentSelection.name }</h3>
                    <p>{ currentSelection.desc }</p>
                </div>
            </div>
        </div>
        )
    }
};

class App extends React.Component {
  hydrate() {
    return (
    <div className="container-fluid py-3">
        <h4 className="text-center font-weight-light text-light mb-3">React Gallery with Bootstrap</h4>
        <ImageGrid />
    </div>
    )
  }
}


const useStyles = makeStyles(theme => ({
 card: {
 maxWidth: 2000,
 margin: 'auto',
 marginTop: theme.spacing(5),
 marginBottom: theme.spacing(5)
 },
 title: {
 padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
 color: theme.palette.openTitle
 },
 media: {
 minHeight: 100
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


export default function Grid(){
 const classes = useStyles()
 return (
 <Card className={classes.card}>
 <Typography variant="h6" className={classes.title}>
 Selection Page
  </Typography>
//initialise image grid
 <ImageGrid/>
 <CardContent>

 <Typography variant="body1" component="p">
 Welcome A/B Testing home page.
 </Typography>
 </CardContent>
 </Card>
)
}
