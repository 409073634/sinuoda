import moment from 'moment'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'

export const servers = [{
  name: 'www01',
  status: 'success',
  icon: 'globe',
  description: 'Web server that runs our sites'
}, {
  name: 'sql01',
  status: 'danger',
  icon: 'database',
  description: 'mySQL server used for reporting'
}, {
  name: 'mongoDB01',
  status: 'info',
  icon: 'file-code-o',
  description: 'Main DB server'
}, {
  name: 'ldap01',
  status: 'success',
  icon: 'key',
  description: 'Authentication server'
}, {
  name: 'mgmt01',
  status: 'success',
  icon: 'home',
  description: 'Management server with all tools'
}, {
  name: 'bkup01',
  status: 'warning',
  icon: 'backward',
  description: 'Backup server'
}]

export const stats = [{
  header: '8390',
  text: 'Visitors'
}, {
  header: '30%',
  text: 'Referrals'
}, {
  header: '70%',
  text: 'Organic'
}]

export const timeline = [{
  icon: 'fa-envelope',
  color: 'blue',
  title: 'Write short novel',
  time: moment().endOf('day').fromNow(),
  body: 'Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning heekya handango imeem plugg dopplr jibjab, movity jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle quora plaxo ideeli hulu weebly balihoo...',
  buttons: [{
    type: 'primary',
    message: 'Read more'
  }]
},
{
  icon: 'fa-user',
  color: 'yellow',
  title: 'Sarah Young accepted your friend request',
  time: moment('20150620', 'MMM Do YY').fromNow()
},
{
  icon: 'fa-camera',
  color: 'purple',
  title: 'Watch a youTube video',
  time: moment('20130620', 'YYYYMMDD').fromNow(),
  body: '<div class="embed-responsive embed-responsive-16by9"><iframe width="560" height="315" src="https://www.youtube.com/embed/8aGhZQkoFbQ" frameborder="0" allowfullscreen></iframe></div>'
}]

export const dashinfo1 = [{
  text: 'CPU Traffic',
  num: '90<small>%</small>',
  color: 'aqua',
  icon: 'ion-ios-gear-outline'
}, {
  text: 'Likes',
  num: '41,520',
  color: 'red',
  icon: 'google-plus'
}, {
  text: 'Sales',
  num: '760',
  color: 'green',
  icon: 'ion-ios-cart-outline'
}, {
  text: 'New Members',
  num: '2007',
  color: 'yellow',
  icon: 'ion-ios-people-outline'
}]

export const dashinfo2 = [{
  text: 'Inventory',
  num: '5,221',
  color: 'yellow',
  icon: 'ion-ios-pricetag-outline',
  progress: 52
}, {
  text: 'Mentions',
  num: '92,230',
  color: 'green',
  icon: 'ion-ios-heart-outline',
  progress: 21
}, {
  text: 'Downloads',
  num: '114.288',
  color: 'red',
  icon: 'ion-ios-cloud-download-outline',
  progress: 68
}, {
  text: 'Direct Messages',
  num: '153,822',
  color: 'aqua',
  icon: 'ion-ios-chatbubble-outline',
  progress: 40
}]

export const dashinfo3 = [{
  text: 'New Orders',
  num: '150',
  color: 'aqua',
  icon: 'shopping-cart',
  link: '#'
}, {
  text: 'Bounce Rate',
  num: '53<sup style="font-size: 20px">%</sup>',
  color: 'green',
  icon: 'ion-stats-bars',
  link: '#'
}, {
  text: 'User Registrations',
  num: '44',
  color: 'yellow',
  icon: 'ion-person-add',
  link: '#'
}, {
  text: 'Unique Visitors',
  num: '65',
  color: 'red',
  icon: 'ion-pie-graph',
  link: '#'
}]

export const tableData1 = {
  title: 'Striped Full Width Table!',
  options: {
    collapsable: true,
    color: 'success',
    type: 'table-striped'
  },
  cols: [{
    id: 'order',
    name: '#',
    type: 'order',
    style: 'width: 10px'
  }, {
    id: 'task',
    name: 'task',
    type: 'text',
    sort: 1
  }, {
    id: 'prog',
    name: 'progress',
    type: 'progress',
    sort: 1
  }, {
  }, {
    id: 'label',
    name: 'label',
    type: 'label',
    style: 'width: 40px'
  }],
  rows: [{
    task: 'Update software',
    prog: '55',
    label: '55%',
    color: 'red'
  }, {
    task: 'Clean database',
    prog: '70',
    label: '70%',
    color: 'yellow'
  }, {
    task: 'Cron job running',
    prog: '30',
    label: '30%',
    color: 'blue'
  }, {
    task: 'Fix and squish bugs',
    prog: '90',
    label: '90%',
    color: 'green'
  }]
}

export const tableData2 = {
  title: 'Data Table With Full Features!!',
  type: 'table-bordered table-striped',
  cols: [{
    id: 'engine',
    name: 'Rendering Engine',
    type: 'text',
    style: 'width: 167px'
  }, {
    id: 'browser',
    name: 'Browser',
    type: 'text',
    style: 'width: 207px'
  }, {
    id: 'platform',
    name: 'Platform(s)',
    type: 'text',
    style: 'width: 182px'
  }, {
    id: 'version',
    name: 'Engine Version',
    type: 'text',
    style: 'width: 142px'
  }, {
    id: 'cssgrade',
    name: 'CSS Grade',
    type: 'text',
    style: 'width: 101px'
  }],
  rows: [{
    engine: 'Blink',
    browser: 'Iridium 54.0',
    platform: 'GNU/Linux',
    version: '54',
    cssgrade: 'A'
  }, {
    engine: 'Gecko',
    browser: 'Firefox 1.0',
    platform: 'Win 98+ / OSX.2+',
    version: '1.7',
    cssgrade: 'A'
  }, {
    engine: 'Gecko',
    browser: 'Firefox 1.5',
    platform: 'Win 98+ / OSX.2+',
    version: '1.8',
    cssgrade: 'A'
  }, {
    engine: 'Gecko',
    browser: 'Firefox 2.0',
    platform: 'Win 98+ / OSX.2+',
    version: '1.8',
    cssgrade: 'A'
  }, {
    engine: 'Gecko',
    browser: 'Firefox 3.0',
    platform: 'Win 2k+ / OSX.3+',
    version: '1.9',
    cssgrade: 'A'
  }, {
    engine: 'Gecko',
    browser: 'Camino 1.0',
    platform: 'OSX.2+',
    version: '1.8',
    cssgrade: 'A'
  }, {
    engine: 'Gecko',
    browser: 'Camino 1.5',
    platform: 'OSX.3+',
    version: '1.8',
    cssgrade: 'A'
  }, {
    engine: 'Gecko',
    browser: 'Netscape 7.2',
    platform: 'Win 95+ / Mac OS 8.6-9.2',
    version: '1.7',
    cssgrade: 'A'
  }, {
    engine: 'Gecko',
    browser: 'Netscape Browser 8',
    platform: 'Win 98SE+',
    version: '1.7',
    cssgrade: 'A'
  }, {
    engine: 'Gecko',
    browser: 'Netscape Navigator 9',
    platform: 'Win 98+ / OSX.2+',
    version: '1.8',
    cssgrade: 'A'
  }, {
    engine: 'Gecko',
    browser: 'Mozilla 1.0',
    platform: 'Win 95+ / OSX.1+',
    version: '1',
    cssgrade: 'A'
  }]
}

export const tabdata = {
  title: '<i class="fa fa-th"></i> Custom Tabs',
  tabs: [{
    type: 'html',
    name: 'Tab 1',
    content: `<b>How to use:</b>

<p>Exactly like the original bootstrap tabs except you should use
the custom wrapper <code>.nav-tabs-custom</code> to achieve this style.</p>
A wonderful serenity has taken possession of my entire soul,
like these sweet mornings of spring which I enjoy with my whole heart.
I am alone, and feel the charm of existence in this spot,
which was created for the bliss of souls like mine. I am so happy,
my dear friend, so absorbed in the exquisite sense of mere tranquil existence,
that I neglect my talents. I should be incapable of drawing a single stroke
at the present moment; and yet I feel that I never was a greater artist than now.`
  }, {
    type: 'text',
    name: 'Tab 2',
    content: `The European languages are members of the same family. Their separate existence is a myth.
For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ
in their grammar, their pronunciation and their most common words. Everyone realizes why a
new common language would be desirable: one could refuse to pay expensive translators. To
achieve this, it would be necessary to have uniform grammar, pronunciation and more common
words. If several languages coalesce, the grammar of the resulting language is more simple
and regular than that of the individual languages.`
  }, {
    type: 'node',
    name: 'Tab 3',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of type and scrambled it to make a type specimen book.
It has survived not only five centuries, but also the leap into electronic typesetting,
remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
like Aldus PageMaker including versions of Lorem Ipsum.`
  }]
}

// Accordion data
//
let accordionContext = `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
labore sustainable VHS.`

export const accordiondata = [{
  type: 'text',
  title: 'Collapsible Group Item #1',
  color: 'warning',
  content: accordionContext
}, {
  type: 'node',
  title: 'Collapsible Group Success',
  color: 'success'
}, {
  type: 'text',
  title: 'Collapsible Group Danger',
  color: 'danger',
  active: true,
  content: accordionContext
}]

// Data table
let goodsData = JSON.parse(`[{"Id":"70547bce-9ab3-e711-818a-2c4d544e37cf","Name":"钓鱼杆8832","icon":"","Description":"","Memo":"测试","Score":43,"Quantity":15,"FrozenCount":0},{"Id":"20df144b-9ab3-e711-818a-2c4d544e37cf","Name":"炒菜铲kit","icon":"","Description":"可塑小型","Memo":"测试","Score":121,"Quantity":1,"FrozenCount":0},{"Id":"e01bae28-9ab3-e711-818a-2c4d544e37cf","Name":"雨水8s","icon":"","Description":"来自南宁市","Memo":"测试","Score":32,"Quantity":3,"FrozenCount":0},{"Id":"80e39d03-9ab3-e711-818a-2c4d544e37cf","Name":"矿石A","icon":"","Description":"松松散散","Memo":"测试","Score":11,"Quantity":20,"FrozenCount":0},{"Id":"10575368-02ab-e711-92a4-2c4d544e37cf","Name":"假山","icon":"/images/goods/201710071005396166000.png","Description":"节十九世纪","Memo":"测试","Score":54,"Quantity":3,"FrozenCount":0},{"Id":"c0282222-08a0-e711-8e4e-2c4d544e37cf","Name":"物品4","icon":"/images/201709211331152992000.jpg","Description":"xxxx","Memo":"","Score":56,"Quantity":45,"FrozenCount":4},{"Id":"500944e5-07a0-e711-8e4e-2c4d544e37cf","Name":"物品22","icon":"/images/goods/201710071019348266000.png","Description":"1咚咚咚咚多多多","Memo":"","Score":56,"Quantity":45,"FrozenCount":0},{"Id":"003d576f-df92-e711-bede-2c4d544e37cf","Name":"产品1","icon":"/images/201709191109232250000.jpg","Description":"1111","Memo":null,"Score":4,"Quantity":81,"FrozenCount":5}]`)
export const goodsAPI = {
  getList: function (page, pageSize, searchName) {
    let items = goodsData
    if (searchName) {
      items = goodsData.filter(item => item.Name.indexOf(searchName) >= 0)
    }
    let startIdx = page * pageSize
    let endIdx = startIdx + pageSize
    return Promise.resolve({
      Total: items.length,
      PageData: items.slice(startIdx, endIdx)
    })
  },
  add: function (item) {
    item.Id = goodsData[goodsData.length - 1].Id + 1
    goodsData.unshift(item)
    return Promise.resolve(item)
  },
  update: function (item) {
    let origItem = find(goodsData, _item => _item.Id === item.Id)
    if (origItem) {
      Object.assign(origItem, item)
    }
    return Promise.resolve(item)
  },
  delete: function (itemId) {
    let idx = findIndex(goodsData, item => item.Id === itemId)
    if (idx >= 0) {
      goodsData.splice(idx, 1)
    }
    return Promise.resolve('')
  }
}
