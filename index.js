$(document).ready(function($) {
// Friend Namespace
;(function ( Friend, undefined ) {

  var $dom = buildDOMRefs();
  var templates = buildTemplates();

  renderMain();
  bindHandlers();

  function buildDOMRefs() {
    return {
      doc:                  $(document),
      body:                 $('body'),
      container:            $('#friends_wrapper'),
    };
  }

  function buildTemplates() {
    return {
      friend_list :  _.template($('[data-template="friend_info"]').html()),
    };
  }

  function renderMain() {
    var listFriends;

    var friendInfo = getFriendInfo();
    friendInfo.done(function(data) {
      listFriends = data.result;

      _.forEach(listFriends, function(friend) {
        var templateData = {
          friend_name : friend.name,
          telephone_number : friend.phone,
        }

        $dom.container.append(templates.exclusion_list(_.extend({
          company_name : '',
          telephone_number : '',
        }, templateData)));
      })
    });

  }

  function getFriendInfo() {
    return $.getJSON('/v1/friend-info');
  }

  function bindHandlers() {
    $dom.container.on('click', '.friend_name', handlerControlAction.bind(this));
  }

  function handlerControlAction(e) {
    $(e.target).css('color', 'red');
  }




})(window.Friend = window.Friend || {});
});
