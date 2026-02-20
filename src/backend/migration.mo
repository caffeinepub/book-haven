import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";

module {
  // Old persistent types
  type OldBook = {
    title : Text;
    author : Text;
    price : Nat;
    coverImage : Storage.ExternalBlob;
  };

  type OldSellRequest = {
    seller : Principal;
    bookInfo : OldBook;
    status : { #pending; #reviewed; #accepted };
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, { name : Text }>;
    books : Map.Map<Text, OldBook>;
    bookPreferences : Map.Map<Principal, { genres : [Text] }>;
    sellRequests : Map.Map<Nat, OldSellRequest>;
  };

  // New persistent types (from main.mo)
  type NewBook = {
    title : Text;
    author : Text;
    genre : Text;
    price : Nat;
    coverImage : Storage.ExternalBlob;
  };

  type NewSellRequest = {
    seller : Principal;
    bookInfo : NewBook;
    status : { #pending; #reviewed; #accepted };
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, { name : Text }>;
    books : Map.Map<Text, NewBook>;
    bookPreferences : Map.Map<Principal, { genres : [Text] }>;
    sellRequests : Map.Map<Nat, NewSellRequest>;
  };

  // Perform upgrade
  public func run(old : OldActor) : NewActor {
    let migratedBooks = old.books.map<Text, OldBook, NewBook>(
      func(_id, oldBook) {
        {
          oldBook with
          genre = "Unknown"
        };
      }
    );
    let migratedSellRequests = old.sellRequests.map<Nat, OldSellRequest, NewSellRequest>(
      func(_id, oldRequest) {
        {
          oldRequest with
          bookInfo = { oldRequest.bookInfo with genre = "Unknown" };
        };
      }
    );
    {
      old with
      books = migratedBooks;
      sellRequests = migratedSellRequests;
    };
  };
};
