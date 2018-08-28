export default {
  isHiddenRegBtn: false,
  title: `Thông Tin Sản Phẩm`,
  isLoading: false,
  isModalOpened: false,
  editingRec: {},
  backupRec: {},
  recs: [],
  icon: 'shopping_basket',
  cols: [
    {
      name: 'menuname',
      required: true,
      label: 'Name',
      align: 'left',
      field: 'menuname',
      sortable: true,
      style: 'width: 60%',
    },
    {
      name: 'quantity',
      required: true,
      label: 'Quantity',
      align: 'left',
      field: 'quantity',
      sortable: true,
      style: 'width: 20%',
    },
    {
      name: 'price',
      required: true,
      label: 'Price',
      align: 'left',
      field: 'price',
      sortable: true,
      style: 'width: 20%',
    },
  ],
}