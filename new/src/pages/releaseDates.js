import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ReleaseDateTable } from 'src/sections/ReleaseDates/releaseDate-table';
import { ReleaseDateSearch } from 'src/sections/ReleaseDates/releaseDate-search';
import { applyPagination } from 'src/utils/apply-pagination';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'; 
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import {SDK} from '../api/index'

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: 'Fran Perez',
    phone: '712-351-5711'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive'
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@devias.io',
    name: 'Jie Yan Song',
    phone: '770-635-2682'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Madrid',
      country: 'Spain',
      name: 'Anika Visser',
      street: '4158  Hedge Street'
    },
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'anika.visser@devias.io',
    name: 'Anika Visser',
    phone: '908-691-3242'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247'
    },
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: 'miron.vitold@devias.io',
    name: 'Miron Vitold',
    phone: '972-333-4106'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road'
    },
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: 'penjani.inyene@devias.io',
    name: 'Penjani Inyene',
    phone: '858-602-3409'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188  Armbrester Drive'
    },
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: 'omar.darobe@devias.io',
    name: 'Omar Darobe',
    phone: '415-907-2647'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'Los Angeles',
      country: 'USA',
      state: 'California',
      street: '1798  Hickory Ridge Drive'
    },
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: 'siegbert.gottfried@devias.io',
    name: 'Siegbert Gottfried',
    phone: '702-661-1654'
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'Murray',
      country: 'USA',
      state: 'Utah',
      street: '3934  Wildrose Lane'
    },
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: 'iulia.albu@devias.io',
    name: 'Iulia Albu',
    phone: '313-812-8947'
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    address: {
      city: 'Salt Lake City',
      country: 'USA',
      state: 'Utah',
      street: '368 Lamberts Branch Road'
    },
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: 'nasimiyu.danai@devias.io',
    name: 'Nasimiyu Danai',
    phone: '801-301-7894'
  }
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [value, setValue] = useState(dayjs(new Date()));
  const [releaseDates, setReleaseDates] = useState([]);
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [cusId, setCusId] = useState('');
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackSeverity, setSnackSeverity] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [state, setState] = React.useState({
    opens: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, opens } = state;
  const [singleData, setSingleData] = useState('');
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
        first_name: '',
        last_name: '',
        nic: '',
        address: '',
        shop_name: '',
        phone_number: '',
        route: ''
    },
  });

  useEffect(() => {
    console.log("SDK: ", SDK);
    setOpenBackDrop(true)

    SDK.ReleaseDatesType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setReleaseDates(res?.data?.results);
      setOpenBackDrop(false)
    })
    .catch((error) => {
      console.log("Error: ", error)
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
      setOpenBackDrop(false)
    })
  }, [open, openUpdate, openDelete])

  useEffect(() => {
    console.log("cusId: ", cusId);
    setOpenBackDrop(true)
    cusId && SDK.ReleaseDatesType.getById(cusId)
    .then((res) => {
      console.log("RES: ", res);
      setSingleData(res?.data);
      setType(res?.data?.type);
      setDate(res?.data?.date);
      reset(res?.data);
      setOpenBackDrop(false)
    })
    .catch((error) => {
      console.log("Error: ", error);
      setOpenBackDrop(false);
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    })
  }, [openUpdate === true, cusId])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleAddNew = () => {
    setOpen(true);
  };

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleDatePicker = (e) => {
    console.log(moment(e).format('YYYY-MM-DD'))
    setDate(moment(e).format('YYYY-MM-DD'))
  }

  const handleSubmitCreate = (event) => {
    // console.log("obj");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
      type: type,
      date: date,
      note: data.get('note'),
    }
      console.log(obj);
      
    SDK.ReleaseDatesType.add(obj)
    .then((res) => {
      console.log("RES: ", res);
      // setOpen(false);
      // setSnackSeverity('success');
      // setMessage('Record Created Sucessfully!');
      // setOpenSnack(true);
    })
    .catch((error) => {
      console.log("Error: ", error);
      // setOpen(false);
      // setSnackSeverity('error');
      // setMessage('Error In Record Creation!');
      // setOpenSnack(true);
    })
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {
    cusId && SDK.ReleaseDatesType.deletebyId(cusId)
    .then((res) => {
      console.log("RES: ", res);
      setOpenDelete(false);
      setSnackSeverity('success');
      setMessage('Record Deleted Sucessfully!');
      setOpenSnack(true);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setOpenDelete(false);
      setSnackSeverity('error');
      setMessage('Error In Record Deletion!');
      setOpenSnack(true);
    })
  };

  const handleSubmitUpdate = (values) => {
    console.log(values)
    const obj = {
      date: date,
      type:  type,
      note:  values.note,
    }
    console.log(obj);
    
    cusId && SDK.ReleaseDatesType.updatePatch(cusId, obj)
    .then((res) => {
      console.log("RES: ", res);
      setOpenUpdate(false);
      setSnackSeverity('success');
      setMessage('Record Updated Sucessfully!');
      setOpenSnack(true);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setOpenUpdate(false);
      setSnackSeverity('error');
      setMessage('Error In Record Update!');
      setOpenSnack(true);
    })
  };

  return (
    <>
      <Head>
        <title>
          Release Dates
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Release Dates
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleAddNew}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <ReleaseDateSearch />
            <ReleaseDateTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
              data={releaseDates?.length > 0 ? releaseDates : []}
              openView={openView}
              setOpenView={setOpenView}
              openUpdate={openUpdate}
              setOpenUpdate={setOpenUpdate}
              openDelete={openDelete}
              setOpenDelete={setOpenDelete}
              setCusId={setCusId}
              cusId={cusId}
            />
          </Stack>
          <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add New Customer</DialogTitle>
              <Box component="form" onSubmit={handleSubmitCreate} noValidate sx={{ mt: 1 }}>
              <DialogContent>
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText> */}
                 <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Age"
                  fullWidth
                  onChange={handleChange}
                >
                  <MenuItem value={'POYA'}>Poya Day</MenuItem>
                  <MenuItem value={'OTHER'}>Other</MenuItem>
                </Select>

                <DatePicker
                  renderInput={(inputProps) => <TextField {...inputProps} variant="outlined" />}
                  slotProps={{ textField: { variant: 'outlined' } }}
                  onChange={(e) => handleDatePicker(e)}
                  value={date}
                />

                <TextField
                  autoFocus
                  margin="dense"
                  id="note"
                  name="note"
                  label="Note"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button type={'submit'} onSubmit={handleSubmitCreate}>Save</Button>
              </DialogActions>
              </Box>
            </Dialog>
          </div>
          <div>
            <Dialog open={openUpdate} onClose={handleCloseUpdate}>
              <DialogTitle>Update Customer</DialogTitle>
              <Box component="form" onSubmit={handleSubmit(handleSubmitUpdate)} noValidate sx={{ mt: 1 }}>
              <DialogContent>
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText> */}
                <DialogContent>
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText> */}
                 <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Age"
                  fullWidth
                  onChange={handleChange}
                >
                  <MenuItem value={'POYA'}>Poya Day</MenuItem>
                  <MenuItem value={'OTHER'}>Other</MenuItem>
                </Select>

                <DatePicker
                  renderInput={(inputProps) => <TextField {...inputProps} variant="outlined" />}
                  slotProps={{ textField: { variant: 'outlined' } }}
                  onChange={(e) => handleDatePicker(e)}
                  value={date}
                />

                <TextField
                {...register("note")}
                  autoFocus
                  margin="dense"
                  id="note"
                  name="note"
                  label="Note"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseUpdate()}>Cancel</Button>
                <Button type={'submit'} onSubmit={handleSubmit(handleSubmitUpdate)}>Save</Button>
              </DialogActions>
              </Box>
            </Dialog>
          </div>
          <div>
            <Dialog open={openDelete} onClose={handleCloseDelete}>
              <DialogTitle>Delete Release Date </DialogTitle>
              <Box component="form" noValidate sx={{ mt: 1 }} width={'500px'}>
              <DialogContent>
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText> */}

                <Typography variant="h8" fullWidth sx={{ mb: 1 }}>
                  Are You Sure You Want To Delete This Record? 
                </Typography>

              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDelete}>Close</Button>
                <Button onClick={handleDelete}>Confirm</Button>
              </DialogActions>
              </Box>
            </Dialog>
          </div>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
