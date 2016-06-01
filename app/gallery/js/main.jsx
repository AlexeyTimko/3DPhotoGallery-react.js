/**
 * Created by Timko on 31.05.2016.
 */

class Slide extends React.Component {
    render() {
        var cn = "slide slide-wrap";
        if (this.props.isActive) {
            cn += " active";
        }
        return (
            <div className={cn} style={this.props.style}/>
        );
    }
}

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            rotation: 0
        };
    }

    getMousePosition(event) {
        let eventDoc, doc, body, pageX, pageY;

        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0 );
        return {X: pageX, Y: pageY};
    }

    mouseMove(event) {
        let position = this.getMousePosition(event),
            props = this.props,
            cnt = props.items.length,
            angle = 360 / cnt,
            wRight = window.innerWidth / 2 + this.props.width / 2,
            wLeft = window.innerWidth / 2 - this.props.width / 2;
        if (!this.state.rotation) {
            let direction = 0;
            if (position.X > wRight) {
                direction = -1;
            }
            if (position.X < wLeft) {
                direction = 1;
            }
            if (direction != 0) {
                this.rotate(angle * direction);
                let id = setInterval(function () {
                    this.rotate(angle * direction);
                }.bind(this), 500);
                this.setState({rotation: id});
            }
        }

        if (position.X > wLeft && position.X < wRight) {
            this.stopRotation();
        }
    }

    rotate(angle) {
        this.setState({angle: this.state.angle + angle});
    }

    stopRotation() {
        clearInterval(this.state.rotation);
        this.setState({rotation: 0});
    }

    render() {
        var props = this.props;
        var cnt = props.items.length;
        var angle = 360 / cnt;
        var tz = Math.round(( props.width / 2 ) / Math.tan(Math.PI / cnt));
        var slides = props.items.map(function (el, i) {
            var isActive = (Math.round(this.state.angle) - ( -Math.round(angle * i))) % 360 == 0;
            var style = {
                transform: "rotateY(" + (angle * i) + "deg) translateZ( " + (isActive ? tz * 1.15 : tz) + "px )",
                "background-image": "url(" + el + ")",
                width: (props.width - 22) + "px",
                height: (props.height - 22) + "px"
            };

            return <Slide key={i} style={style} isActive={isActive}/>
        }.bind(this));
        var style = {
            width: props.width + "px",
            height: props.height + "px"
        };

        return (
            <div onMouseMove={(e)=>{this.mouseMove(e)}}
                 onMouseLeave={()=>{this.stopRotation()}}
            >
                <div className="slider-wrap" style={style}>
                    <div className="slider"
                         style={{"transform": "translateZ( -"+tz+"px ) rotateY("+this.state.angle+"deg)"}}>
                        {slides}
                    </div>
                </div>
                <button class="prev" onClick={()=>{this.rotate(angle)}}>{'<<'}</button>
                <button class="next" onClick={()=>{this.rotate(-angle)}}>{'>>'}</button>
            </div>
        );
    }
}

var items = [
    "./app/gallery/img/1.jpg",
    "./app/gallery/img/2.jpg",
    "./app/gallery/img/6.jpg",
    "./app/gallery/img/3.png",
    "./app/gallery/img/4.jpg",
    "./app/gallery/img/5.jpg",
    "./app/gallery/img/6.jpg",
    "./app/gallery/img/7.jpg",
    "./app/gallery/img/8.jpg",
    "./app/gallery/img/9.jpeg",
    "./app/gallery/img/10.jpg"
];

ReactDOM.render(
    <Slider items={items} width={300} height={200}/>,
    document.getElementById('photos')
);