var Box = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
  },
  render: function() {
/* 	  console.log('param passed: '+this.props.word);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
	  method: 'POST',
	  data: {word: this.props.word, test : "0"},
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    }); */
    return (
      <div className="Box">
        <List data={this.props.res} />
       
      </div>
    );
  }
});
	
var List = React.createClass({
  render: function() {
    var Nodes = this.props.data.map(function (comment) {
      return (
        <Entry data = {comment}>          
        </Entry>
      );
    });
    return (
      <div className="List">
		{Nodes}
      </div>
    );
  }
});

//var click = function(e){console.log(e.props.data.region)};

var Entry = React.createClass({
	click: function(e){
		e.preventDefault();
		console.log(this.props.data.region);	
		var body = this.props.data.body;
		$('#side').show();
		$('#sideContent').animate({left:'0px'},300);
		$('#sideContent').html(body);
		$('body').css('overflow','hidden');
		return;		
		},
  render: function() {
    return (
      <div className="Entry" data={this.props.data}>
			<myImg><img src = '/images/house.jpg' /></myImg>
			<myText>
			<myTitle onClick = {this.click} >{this.props.data.title} </myTitle><hr/><br/><br/> 
			<myPrice>{this.props.data.price} </myPrice><br/>		
			<myLoc> {this.props.data.location} </myLoc>	<br/><br/>
			<customize><save>save</save><fav>favourite</fav></customize><myDate> {this.props.data.date} </myDate>	
			</myText>
      </div>
    );
  }
});

$('#side').click(function(){
		$('#sideContent').animate({left: '-500px'}, 300, 
			function(){
				$('#side').hide();
				$('body').css('overflow', 'scroll');
				});
});

$('button#search').click(function(){
	var keyword = ' '+$('.searchBar').val();
	alert('input: ' + keyword);	
    $.ajax({
      url: "http://fleksin.com:3000/onerent/search",
      dataType: 'json',
      cache: false,
	  method: 'POST',
	  data: {word: keyword},
      success: function(data) {
        if(keyword.length != 0){
			React.render(
				<Box  res = {data} />,
				document.getElementById('content')		
			);
		}
		else{
			console.log('no input!');
		}
      },
      error: function(xhr, status, err) {
        console.error("", status, err.toString());
      }
    });
	
	
});

var menuHomeY = $('#menuBar').offset().top;
var isFixed = false;
var $w = $(window);
$w.scroll(function() {
	var scrollTop = $(window).scrollTop();
	var shouldBeFixed = scrollTop > menuHomeY;
	if (shouldBeFixed && !isFixed) {
		$('#menuBar').css({
			position: 'fixed',
			top: 0,
		});
		isFixed = true;
	}
	else if (!shouldBeFixed && isFixed)
	{
		$('#menuBar').css({
			position: 'relative'
		});
		isFixed = false;
	}
});



		