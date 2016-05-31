/**
 * Created by Timko on 31.05.2016.
 */
var Picture = React.createClass({
    render: function () {
        var cn = "slide slide-wrap";
        if (this.props.isActive) {
            cn += " active";
        }
        return (
            <div className={cn} style={this.props.style}/>
        );
    }
});

var Slider = React.createClass({
    getInitialState: function () {
        return {angle: 0};
    },
    rotate: function (angle) {
        this.setState({angle: this.state.angle + angle});
    },
    render: function () {
        var props = this.props;
        var cnt = props.items.length;
        var angle = 360 / cnt;
        var tz = Math.round(( props.width / 2 ) /
            Math.tan(Math.PI / cnt));
        var slides = props.items.map(function (el, i) {
            var isActive = (Math.round(this.state.angle) - ( -Math.round(angle * i))) % 360 == 0;
            var style = {
                transform: "rotateY(" + (angle * i) + "deg) translateZ( " + (isActive?tz*1.07:tz) + "px )",
                "background-image": "url(" + el + ")",
                width: (props.width - 22) + "px",
                height: (props.height - 22) + "px"
            };

            return <Picture key={i} style={style} isActive={isActive}/>
        }.bind(this));
        var style = {
            width: props.width + "px",
            height: props.height + "px"
        };

        return (
            <div>
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
});

var items = [
    "./app/gallery/img/1.jpg",
    "./app/gallery/img/2.jpg",
    "./app/gallery/img/6.jpg",
    "./app/gallery/img/3.png",
    "./app/gallery/img/4.jpg",
    "./app/gallery/img/5.jpg",
    "./app/gallery/img/6.jpg",
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