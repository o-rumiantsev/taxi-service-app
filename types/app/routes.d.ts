declare namespace Routes.Order {
  interface CreateBody {
    customerId: number;
    sourceAddress: string;
    destinationAddress: string;
  }
  interface Create {
    Body: CreateBody;
  }

  interface StartBody {
    orderId: number;
  }
  interface Start {
    Body: StartBody;
  }

  interface CompleteBody {
    orderId: number;
  }
  interface Complete {
    Body: CompleteBody;
  }

  interface GetQuerystring {
    driverId?: number;
  }
  interface Get {
    Querystring: GetQuerystring;
  }
}

declare namespace Routes.Stats {
  interface ByDriverQuerystring {
    driverId: number;
  }
  interface ByDriver {
    Querystring: ByDriverQuerystring;
  }
}

declare namespace Routes.Stats.Response {
  interface FavouriteDestination {
    favouriteDestination: string;
  }

  interface OrdersCount {
    ordersCount: number;
  }

  interface AverageDriveTime {
    averageDriveTime: string;
  }

  interface TotalOrdersPrice {
    totalOrdersPrice: number;
  }
}
