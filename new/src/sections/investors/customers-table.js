import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { Button, Container, SvgIcon } from '@mui/material';

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    data,
    openView,
    setOpenView,
    openUpdate,
    setOpenUpdate,
    openDelete,
    setOpenDelete,
    cusId,
    setCusId
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                  <TableCell>
                Id
                </TableCell>
                <TableCell>
                Name
                </TableCell>
                <TableCell sx={{ alignItems : 'center', justifyContent : 'center', display: 'flex'}}>
                <div>Actions</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((customer) => {
                console.log(customer)
                const isSelected = selected.includes(customer?.id);

                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={0}
                      >
                        {/* <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar> */}
                        <Typography variant="subtitle2">
                          {customer.id} 
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.name}
                    </TableCell>
                    <TableCell  spacing={2} sx={{ alignItems : 'center', justifyContent : 'center', display: 'flex'}}>
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={0}
                      >
                        {/* <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar> */}
                        <Button
                          // startIcon={(
                          //   <SvgIcon fontSize="small">
                          //     <PlusIcon />
                          //   </SvgIcon>
                          // )}
                          variant="text"
                          onClick={() => {
                            setCusId(customer?.id)
                            setOpenUpdate(true)
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          // startIcon={(
                          //   <SvgIcon fontSize="small">
                          //     <PlusIcon />
                          //   </SvgIcon>
                          // )}
                          variant="text"
                          onClick={() => {
                            setCusId(customer?.id)
                            setOpenDelete(true)
                          }}
                        >
                          Delete
                        </Button>              
                        </Stack>        
                      </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
