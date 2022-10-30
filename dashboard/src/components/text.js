const routes = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "/vacation",
      name: "Vacations",
      icon: <AiTwotoneFileExclamation />,
      subRoutes: [
        {
          path: "/vacations/punjab",
          name: "Punjab ",
          icon: <FaUser />,
        },
        {
          path: "/vacations/KhyberPakhtunkhwa",
          name: "Khyber Pakhtunkhwa",
          icon: <FaLock />,
        },
        {
          path: "/vacations/Sindh",
          name: "Sindh",
          icon: <FaMoneyBill />,
        },
        {
          path: "/vacations/Balochistan",
          name: "Balochistan",
          icon: <FaMoneyBill />,
        },
        {
          path: "/vacations/Kashmir",
          name: "Kashmir",
          icon: <FaMoneyBill />,
        },
        {
          path: "/vacations/Gilgitbaltistan",
          name: "Gilgit Baltistan",
          icon: <FaMoneyBill />,
        },
      ],
    },
    {
      path: "/users",
      name: "Users",
      icon: <BsCartCheck />,
    },
    // {
    //   path: "/settings",
    //   name: "Settings",
    //   icon: <BiCog />,
    //   exact: true,
    //   subRoutes: [
    //     {
    //       path: "/settings/profile",
    //       name: "Profile ",
    //       icon: <FaUser />,
    //     },
    //     {
    //       path: "/settings/inbox",
    //       name: "Inbox ",
    //       icon: <FaUser />,
    //     },
  
    //   ],
    // },
    {
      path: "/saved",
      name: "Saved",
      icon: <AiFillHeart />,
    },
  ];

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const logoutt = () => {
  //   dispatch(logout());
  // };


  //img
  src="https://kamr.dexignlab.com/xhtml/images/header-img/pic-1.jpg"
                alt="avatar"
                style={{
                  borderRadius: "100%",
                  width: "50px",
                  marginBottom: "10px",
                }}

                <h5>{userInfo.firstName}</h5>
              <span>{userInfo.email}</span>