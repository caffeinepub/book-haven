import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type UserProfile = {
    name : Text;
    // More profile fields can be added here
  };

  type Book = {
    title : Text;
    author : Text;
    price : Nat;
    coverImage : Storage.ExternalBlob;
  };

  module Book {
    public func fromJson(title : Text, author : Text, price : Nat, coverImage : Storage.ExternalBlob) : Book {
      {
        title;
        author;
        price;
        coverImage;
      };
    };
  };

  type BookPreferences = {
    genres : [Text];
  };

  type SellRequest = {
    seller : Principal;
    bookInfo : Book;
    status : { #pending; #reviewed; #accepted };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let books = Map.empty<Text, Book>();
  let bookPreferences = Map.empty<Principal, BookPreferences>();
  let sellRequests = Map.empty<Nat, SellRequest>();

  // Profile management endpoints for the frontend
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(userId : Principal) : async ?UserProfile {
    if (caller != userId and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(userId);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func saveCallerBookPreferences(genres : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save preferences");
    };
    let prefs = { genres };
    bookPreferences.add(caller, prefs);
  };

  public query ({ caller }) func getCallerBookPreferences() : async ?BookPreferences {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access preferences");
    };
    bookPreferences.get(caller);
  };

  public query ({ caller }) func getSampleBooks() : async [Book] {
    [
      {
        title = "Book 1";
        author = "Author 1";
        price = 150;
        coverImage = "Work-in-progress";
      },
      {
        title = "Book 2";
        author = "Author 2";
        price = 180;
        coverImage = "Work-in-progress";
      },
      {
        title = "Book 3";
        author = "Author 3";
        price = 120;
        coverImage = "Work-in-progress";
      },
      {
        title = "Book 4";
        author = "Author 4";
        price = 160;
        coverImage = "Work-in-progress";
      },
      {
        title = "Book 5";
        author = "Author 5";
        price = 140;
        coverImage = "Work-in-progress";
      },
      {
        title = "Book 6";
        author = "Author 6";
        price = 200;
        coverImage = "Work-in-progress";
      },
    ];
  };

  public shared ({ caller }) func submitSellRequest(title : Text, author : Text, price : Nat, coverImage : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit sell requests");
    };
    let bookInfo = Book.fromJson(title, author, price, coverImage);
    let requestId = sellRequests.size();
    let sellRequest = {
      seller = caller;
      bookInfo;
      status = #pending;
    };
    sellRequests.add(requestId, sellRequest);
  };

  public query ({ caller }) func getBookCatalog() : async [(Text, Book)] {
    books.entries().toArray();
  };

  public shared ({ caller }) func addBook(id : Text, title : Text, author : Text, price : Nat, coverImage : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add books to the catalog");
    };
    let book = Book.fromJson(title, author, price, coverImage);
    books.add(id, book);
  };

  // Camera and voice search features are offloaded to the frontend for device integration
};
