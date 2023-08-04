const dictMap = {
  global: {
    status: {
      0: '禁用',
      1: '启用',
    },
  },
  order: {
    status: {
      0: {
        text: '已取消',
        color: 'gray',
        longText: '取消订单，交易关闭'
      },
      1: {
        text: '待付款',
        color: 'gold',
        longText: '商品已拍下，等待买家付款'
      },
      2: {
        text: '待扣款',
        color: 'red',
        longText: '等待金蝶订单审核通过扣款'
      },
      3: {
        text: '待发货',
        color: 'blue',
        longText: '买家已付款'
      },
      4: {
        text: '待收货',
        color: 'lime',
        longText: '卖家已发货,等待买家收货'
      },
      5: {
        text: '已完成',
        color: 'green',
        longText: '买家确认收货，交易成功'
      },
    },
  },
  system: {
    user: {
      sex: {
        '0': '男',
        '1': '女',
        '2': '保密',
      },
      status: {
        '0': {
          text: '禁用',
          color: 'orange',
        },
        '1': {
          text: '正常',
          color: 'green',
        },
      },
    },
  },
  shop: {
    banner: {
      imgType: {
        1: '广告图片',
        3: '商城图片轮播',
      },
    },
  },
}

export default function useDict() {
  return function getDictValue(key: string) {
    const keys = key.split('.')
    let tmp = dictMap
    for (let i = 0; i < keys.length; i += 1) {
      // @ts-ignore
      tmp = tmp[keys[i]]
    }
    return tmp
  }
}
