export default {
  isModalOpened: false,
  isModalQRCodeOpened: false,
  currentGenGiftCardCode: 'eee',
  token: localStorage.getItem('auth-token') || '',
  isLoading: false,
  name: '',
  role: '',
  giftcard: {},
  recs: [],
  title: 'Gift Card',
  icon: 'card_giftcard',
  selected: [],
  editingRec: {},
  backupRec: {},
  cols: [
    {
      name: 'edit',
      align: 'left',
      field: 'edit',
      width: '34px',
    },
    {
      name: 'qrcode',
      align: 'left',
      field: 'id',
      width: '34px',
    },
    {
      name: 'userName',
      label: 'User Name',
      align: 'left',
      field: 'userName',
      sortable: true,
    },
    {
      name: 'amount',
      label: 'Amount',
      align: 'left',
      field: 'amount',
      sortable: true,
    },
    {
      name: 'expiry',
      label: 'Expiry',
      align: 'left',
      field: 'expiry',
      sortable: true,
    },
    {
      name: 'createdAt',
      label: 'Create Date',
      align: 'left',
      field: 'createdAt',
      sortable: true,
    },
  ],
}
